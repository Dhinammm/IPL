require "rubygems"
require "open-uri"
require "nokogiri"
require "selenium-webdriver"
require "capybara"
class PlayersController < ApplicationController
  def index
    Capybara.register_driver :selenium do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
    end

    Capybara.javascript_driver = :chrome
    Capybara.configure do |config|
      config.default_max_wait_time = 10
      config.default_driver = :selenium
    end
    options = Selenium::WebDriver::Options.chrome
    options.page_load_strategy = :eager

    driver = Selenium::WebDriver.for :chrome, options: options

    driver.navigate.to "https://iplt20.com/matches/results"
    driver.manage.timeouts.implicit_wait = 100
    driver.find_element(link_text: "Match Centre").click
    sleep 6
    driver.find_element(link_text: "SCORECARD").click
    sleep 10

    html = Nokogiri::HTML(driver.page_source)
    # Venue
    venue = html.at_css('span[ng-bind="matchSummary.GroundName"]')&.text&.strip

    # Winner
    winner_raw = html.at_css(".ms-matchComments.ng-binding.ng-scope")&.text&.strip
    winner = winner_raw.split("Won by").first.strip if winner_raw

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

    # Toss
    toss_text = html.at_css('li:has(span:contains("Toss")) span.ng-binding')&.text&.strip
    toss_details = toss_text
    toss = toss_text.split("Won The Toss And Elected To").first.strip

    # First batting
    decision = toss_text.include?("Bat") ? "Bat" : "Field"
    first_batting = decision == "Bat" ? toss : (toss == team_I ? team_II : team_I)

    sleep 5
    batsmen_data = []
    bowlers_data = []
    extras = []

    max_runs = 0
    max_wickets = 0
    top_run_getter = " "
    top_wicket_taker = " "
    html.css("tbody.team1 tr").each do |row|
      name = row.at_css(".ap-bats-score-name span.ng-binding")&.text&.strip
      dismissal = row.at_css("td.mobile-hide")&.text&.strip
      runs = row.at_css("td:nth-child(3)")&.text&.strip
      balls = row.at_css("td:nth-child(4)")&.text&.strip
      fours = row.at_css("td:nth-child(5)")&.text&.strip
      sixes = row.at_css("td:nth-child(6)")&.text&.strip
      strike_rate = row.at_css("td:nth-child(7)")&.text&.strip

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
        if max_wickets < sixes.to_i
          top_wicket_taker = name
          max_wickets = sixes.to_i
        end
      end
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
    puts best_partnership_I
    sleep 15

    innings_elements = html.css("a.ap-inner-tb-click")

    second_tab = innings_elements[1].text.strip

    first_tab = innings_elements[0].text.strip

    driver.find_element(link_text: first_tab).click

    sleep 12
    html1 = Nokogiri::HTML(driver.page_source)
    batsmen_data_II = []
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
        bowlers_data_II << [name, dismissal, runs, balls, fours, sixes, strike_rate, dots]

        if max_wickets < sixes.to_i
          top_wicket_taker = name
          max_wickets = sixes.to_i
        end
      end
    end

    partnerships = html1.css("ul.partnerContent > li").map do |li|
      players = li.css("div.partners-name .prName").map(&:text)
      scores = li.css("div.partners-name .prScore").map { |s| s.text.strip }
      partnership_text = li.at_css(".prTot span")&.text&.strip
      extras = li.at_css(".prExtra span")&.text&.strip.to_i

      [
        players[0],
        scores[0],
        players[1],
        scores[1],
        partnership_text,
        extras,
      ]
    end

    partnership_runs_II = partnerships.map { |p| p[4][/^\d+/].to_i }
    bp_index_II = partnership_runs_II.index(partnership_runs_II.max)
    best_partnership_II = partnerships[bp_index_II]
    puts best_partnership_II
    best_partnership = partnership_runs.max > partnership_runs_II.max ? best_partnership_I : best_partnership_II

    render json: { venue: venue.as_json,
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
                  extras_II: extras_II,
                  bowlers_data_II: bowlers_data_II.as_json,
                  best_partnership: best_partnership.as_json,
                  top_run_getter: top_run_getter.as_json,
                  top_wicket_taker: top_wicket_taker.as_json,
                  max_runs: max_runs.as_json,
                  max_wickets: max_wickets.as_json }
  end
end
