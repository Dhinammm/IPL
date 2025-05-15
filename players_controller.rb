require "rubygems"
require "open-uri"
require "nokogiri"
require "selenium-webdriver"
require "capybara"

class PlayersController < ApplicationController
  def index
    #  Capybara.register_driver :selenium do |app|
    #    Capybara::Selenium::Driver.new(app, browser: :chrome)
    #  end
    #
    #  Capybara.javascript_driver = :chrome
    #  Capybara.configure do |config|
    #    config.default_max_wait_time = 10
    #    config.default_driver = :selenium
    #  end
    #  options = Selenium::WebDriver::Options.chrome
    #  options.page_load_strategy = :eager
    #
    #  driver = Selenium::WebDriver.for :chrome, options: options
    #   first_match = 1798
    # while (match_no > first_match)
    #  driver.navigate.to "https://www.iplt20.com/match/2025/#{match_no}"
    #   sleep 6
    #  driver.find_element(link_text: "SCORECARD").click
    #    sleep 10
    source = Rails.cache.fetch("source_#{params[:id]}") do
      Source.find_by(match_no: params[:id])
    end
    html = Nokogiri::HTML(source.html)
    id = params[:id]
    # Venue
    venue = html.at_css('span[ng-bind="matchSummary.GroundName"]')&.text&.strip
    match_no = html.at_css(".matchOrder.mob-hide.ng-binding.ng-scope")&.text&.strip
    match_no = match_no.gsub("Match ", "").to_i
    # Winner
    #  winner_raw = html.at_css(".ms-matchComments.ng-binding.ng-scope")&.text&.strip
    winner = html.at_css(".ms-matchComments.ng-binding.ng-scope")&.text&.strip

    #winner = winner_raw.split("Won by").first.strip if winner_raw

    # Innings
    innings_elements = html.css(".ap-total-runs.ng-binding.ng-scope")
    innings_I = innings_elements[0]&.text&.strip
    innings_II = innings_elements[1]&.text&.strip

    umpire_element = html.at_xpath("//text[contains(@ng-if, 'matchSummary.Umpire1Name')]")

    umpire1_name = umpire_element&.text
    umpire_element = html.at_xpath("//text[contains(@ng-if, 'matchSummary.Umpire2Name')]")
    umpire2_name = umpire_element&.text

    onfield_umpire = [umpire1_name, umpire2_name].join(", ")

    third_umpire = html.at_xpath("//text[contains(@ng-if, 'matchSummary.Umpire3Name')]")

    # Referee
    referee = html.at_css('li:has(span:contains("Referee")) span.ng-binding')&.text&.strip

    # Man of the match
    mom_raw = html.at_css('li:has(span:contains("MOM")) span.ng-binding')&.text&.strip
    man_of_the_match = mom_raw&.split(" (")&.first&.strip

    # Match date
    date = html.at_css(".ms-matchdate.ng-binding")&.text&.strip

    # Teams
    team_text = html.at_css('li:has(span:contains("Match")) span.ng-binding')&.text&.strip
    team_I, team_II = team_text.split(" vs ").map(&:strip)
    #Match number
    match_number = html.at_css(".matchOrder.mob-hide.ng-binding.ng-scope")
    # Toss
    toss_text = html.at_css('li:has(span:contains("Toss")) span.ng-binding')&.text&.strip
    toss_details = toss_text
    toss = toss_text.split("Won The Toss And Elected To").first.strip

    # First batting
    decision = toss_text.include?("Bat") ? "Bat" : "Field"
    first_batting = decision == "Bat" ? toss : (toss == team_I ? team_II : team_I)

    #  sleep 5
    batsmen_data = []
    bowlers_data = []
    extras = []
    batsmen_run = []
    max_runs = 0
    max_wickets = 0
    top_run_getter = " "
    top_wicket_taker = " "
    eco_bowler = " "
    min_economy = 99999999999999
    mvp = " "
    max_mvp = 0
    player_points = Hash.new
    html.css("tbody.team1 tr").each do |row|
      name = row.at_css(".ap-bats-score-name span.ng-binding")&.text&.strip
      dismissal = row.at_css("td.mobile-hide")&.text&.strip
      runs = row.at_css("td:nth-child(3)")&.text&.strip
      balls = row.at_css("td:nth-child(4)")&.text&.strip
      fours = row.at_css("td:nth-child(5)")&.text&.strip
      sixes = row.at_css("td:nth-child(6)")&.text&.strip
      strike_rate = row.at_css("td:nth-child(7)")&.text&.strip

      mvp_batting_points = runs.to_i * 1 + fours.to_i * 2 + sixes.to_i * 3 + strike_rate.to_i * 0.1
      player_points[name] = mvp_batting_points

      if max_mvp < player_points[name].to_i
        max_mvp = player_points[name].to_i
        mvp = name
      end

      if max_runs < runs.to_i
        top_run_getter = name
        max_runs = runs.to_i
      end

      if row.at_css("td:nth-child(8)").present?
        dots = row.at_css("td:nth-child(8)")&.text&.strip
      end

      if dismissal
        batsmen_data << [name, dismissal, runs, balls, fours, sixes, strike_rate]
      else
        bowlers_data << [name, dismissal, runs, balls, fours, sixes, strike_rate, dots]

        if max_wickets == sixes.to_i
          if min_economy > strike_rate.to_i
            top_wicket_taker = name
          end
        end
        if max_wickets < sixes.to_i
          top_wicket_taker = name
          max_wickets = sixes.to_i
        end

        if min_economy > strike_rate.to_i && runs.to_i >= 2
          eco_bowler = name
          min_economy = strike_rate.to_i
        end

        mvp_bowling_points = balls.to_i * 10 + sixes.to_i * 10 + 50 / strike_rate.to_i + dots.to_i * 5
        player_points[name] = mvp_bowling_points

        if max_mvp < player_points[name].to_i
          max_mvp = player_points[name].to_i
          mvp = name
        end
      end
    end

    batsmen_name = batsmen_data.map do |player|
      {
        name: player[0],

      }
    end
    batsmen_run = batsmen_data.map do |player|
      { runs: player[2].to_i }
    end
    partnerships = html.css("ul.partnerContent > li").map do |li|
      players = li.css("div.partners-name .prName").map(&:text)
      scores = li.css("div.partners-name .prScore").map { |s| s.text.strip }
      partnership_text = li.at_css(".prTot span")&.text&.strip
      # extras = li.at_css('.prExtra span')&.text&.strip.to_i

      [
        players[0],
        scores[0],
        players[1],
        scores[1],
        partnership_text,
      # extras
      ]
    end

    partnership_runs = partnerships.map { |p| p[4][/^\d+/].to_i }

    bp_index_I = partnership_runs.index(partnership_runs.max)
    best_partnership_I = partnerships[bp_index_I]

    #  sleep 15

    innings_elements = html.css("a.ap-inner-tb-click")

    second_tab = innings_elements[1].text.strip

    first_tab = innings_elements[0].text.strip
    puts first_tab
    puts second_tab
    # driver.find_element(link_text: first_tab).click

    #     sleep 7
    html1 = Nokogiri::HTML(source.html1)
    batsmen_data_II = []
    batsmen_run_II = []
    bowlers_data_II = []
    extras_II = []
    html1.css("tbody.team1 tr").each do |row|
      name = row.at_css(".ap-bats-score-name span.ng-binding")&.text&.strip
      dismissal = row.at_css("td.mobile-hide")&.text&.strip
      runs = row.at_css("td:nth-child(3)")&.text&.strip
      balls = row.at_css("td:nth-child(4)")&.text&.strip
      fours = row.at_css("td:nth-child(5)")&.text&.strip
      sixes = row.at_css("td:nth-child(6)")&.text&.strip
      strike_rate = row.at_css("td:nth-child(7)")&.text&.strip

      mvp_batting_points = runs.to_i * 1 + fours.to_i * 2 + sixes.to_i * 3 + strike_rate.to_i * 0.1

      if player_points.has_key?(name)
        player_points[name] = player_points[name] + mvp_batting_points

        if max_mvp < player_points[name].to_i
          max_mvp = player_points[name].to_i
          mvp = name
        end
      else
        player_points[name] = mvp_batting_points
        if max_mvp < player_points[name].to_i
          max_mvp = player_points[name].to_i
          mvp = name
        end
      end

      if row.at_css("td:nth-child(8)").present?
        dots = row.at_css("td:nth-child(8)")&.text&.strip
      end

      if max_runs < runs.to_i
        top_run_getter = name
        max_runs = runs.to_i
      end

      if fours != nil && dismissal != nil
        batsmen_data_II << [name, dismissal, runs, balls, fours, sixes, strike_rate]
      end
      if dismissal.nil?
        mvp_bowling_points = balls.to_i * 10 + sixes.to_i * 10 + 50 / strike_rate.to_i + dots.to_i * 5

        if player_points.has_key?(name)
          player_points[name] = player_points[name] + mvp_bowling_points

          if max_mvp < player_points[name].to_i
            max_mvp = player_points[name].to_i
            mvp = name
          end
        else
          player_points[name] = mvp_bowling_points

          if max_mvp < player_points[name].to_i
            max_mvp = player_points[name].to_i
            mvp = name
          end
        end
        bowlers_data_II << [name, dismissal, runs, balls, fours, sixes, strike_rate, dots]
        if max_wickets < sixes.to_i
          top_wicket_taker = name
          max_wickets = sixes.to_i
        end

        if min_economy > strike_rate.to_i && runs.to_i >= 2
          eco_bowler = name
          min_economy = strike_rate.to_i
        end
      end
    end

    player_points.each do |player|
    end
    partnerships = html1.css("ul.partnerContent > li").map do |li|
      players = li.css("div.partners-name .prName").map(&:text)
      scores = li.css("div.partners-name .prScore").map { |s| s.text.strip }
      partnership_text = li.at_css(".prTot span")&.text&.strip
      # extras = li.at_css(".prExtra span")&.text&.strip.to_i

      [
        players[0],
        scores[0],
        players[1],
        scores[1],
        partnership_text,
      #extras,
      ]
    end

    partnership_runs_II = partnerships.map { |p| p[4][/^\d+/].to_i }
    bp_index_II = partnership_runs_II.index(partnership_runs_II.max)
    best_partnership_II = partnerships[bp_index_II]

    best_partnership = partnership_runs.max > partnership_runs_II.max ? best_partnership_I : best_partnership_II
    #team_I_id = Team.where(name: team_I).first.id
    #   team_II_id = Team.where(name: team_II).first.id

    batsmen_name_II = batsmen_data_II.map do |player|
      {
        name: player[0],

      }
    end
    batsmen_run_II = batsmen_data_II.map do |player|
      { runs: player[2].to_i }
    end
    #    Match.create!(venue: venue, innings_I: innings_I, innings_II: innings_II, toss: toss, man_of_the_match: man_of_the_match, winner: winner, team_I_id: team_I_id, team_II_id: team_II_id, date: date, first_batting: first_batting, match_no: match_no)
    #   Source.create!(html: html, html1: html1)
    #  match_no = match_no - 1
    # sleep 5
    # end
    #driver.navigate.to "https://iplt20.com/stats/2025"
    #   sleep 5
    player_stats = Rails.cache.fetch("/") do
      TopPlayer.find_by(id: 1)
    end
    bat = Nokogiri::HTML(player_stats.batters)
    # sleep 5
    players = bat.xpath("//table[contains(@class,'st-table statsTable ng-scope')]")
    top_batsmen = bat.css(".st-table.statsTable.ng-scope tbody tr").map do |row|
      row.css("td").map { |td| td.text.strip }
    end
    #    sleep 5
    #    elements = driver.find_elements(:css, ".cSBDisplay")[1].click
    #    sleep 3
    #    elements = driver.find_elements(:css, ".cSBListFItems")[1].click
    #    sleep 3
    #    elements = driver.find_elements(:css, ".cSBListItems")[31].click
    #    sleep 3
    #
    bowl = Nokogiri::HTML(player_stats.bowlers)
    players = bowl.xpath("//table[contains(@class,'st-table statsTable ng-scope')]")
    # top_bowlers = bowl.css("div.st-ply-name.ng-binding").map { |node| node.text.strip }.uniq
    top_bowlers = bowl.css(".st-table.statsTable.ng-scope tbody tr").map do |row|
      row.css("td").map { |td| td.text.strip }
    end

    top_strikers = Nokogiri::HTML(player_stats.top_strikers)

    players = top_strikers.xpath("//table[contains(@class,'st-table statsTable ng-scope')]")
    # top_bowlers = bowl.css("div.st-ply-name.ng-binding").map { |node| node.text.strip }.uniq
    top_strikers = top_strikers.css(".st-table.statsTable.ng-scope tbody tr").map do |row|
      row.css("td").map { |td| td.text.strip }
    end
    # sleep 7
    emerging_players = EmergingPlayer.find_by(id: 1)

    # emerging_players = poll.at_xpath(".//div[contains(@class,'container px-0 pb-2 choice-poll')]")
    emerging_players = Nokogiri::HTML(emerging_players.emerging_players)
    emerging_players_name = emerging_players.css("span.name.w-100").map { |name| name.text.strip }
    emerging_players_vote = emerging_players.css("div.pro-value").map { |vote| vote.text.strip }

    emerging_players
    render json: { venue: venue.as_json,
                   match_no: match_no,
                   innings_I: innings_I.as_json,
                   team_I: team_I.as_json,
                   innings_II: innings_II.as_json,
                   team_II: team_II.as_json,
                   winner: winner.as_json,
                   referee: referee.as_json,
                   date: date.as_json,
                   third_umpire: third_umpire.as_json,
                   first_batting: first_batting.as_json,
                   toss_details: toss_text.as_json,
                   umpire_names: onfield_umpire.as_json,
                   teams: team_text.as_json,
                   batsmen_data: batsmen_data.as_json,
                   extras: extras,
                   bowlers_data: bowlers_data.as_json,
                   batsmen_data_II: batsmen_data_II.as_json,
                   extras_II: extras_II.as_json,
                   bowlers_data_II: bowlers_data_II.as_json,
                   best_partnership: best_partnership.as_json,
                   top_run_getter: top_run_getter.as_json,
                   top_wicket_taker: top_wicket_taker.as_json,
                   max_runs: max_runs.as_json,
                   max_wickets: max_wickets.as_json,
                   eco_bowler: eco_bowler.as_json,
                   mvp: mvp.as_json,
                   man_of_the_match: man_of_the_match.as_json,
                   top_batsmen: top_batsmen,
                   top_bowlers: top_bowlers,
                   first_tab: first_tab,
                   second_tab: second_tab,
                   batsmen_run: batsmen_run,
                   batsmen_run_II: batsmen_run_II,
                   batsmen_name: batsmen_name,
                   batsmen_name_II: batsmen_name_II,
                   emerging_players_name: emerging_players_name,
                   top_strikers: top_strikers }
  end
end
