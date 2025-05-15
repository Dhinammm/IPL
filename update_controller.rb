require "rubygems"
require "open-uri"
require "nokogiri"
require "selenium-webdriver"
require "capybara"

class UpdateController < ApplicationController
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
    sleep 6
    doc = Nokogiri::HTML(driver.page_source)
    ret_val = doc.at_css(".vn-matchOrder.ng-binding.ng-scope")&.text&.strip
    ret_val = ret_val.gsub("Match ", "").to_i
    curr_val = Source.maximum(:match_no)
    while (curr_val + 1798 < ret_val + 1798)
      driver.navigate.to "https://iplt20.com/matches/results"

      driver.manage.timeouts.implicit_wait = 100

      driver.find_element(link_text: "Match Centre").click

      sleep 6

      driver.find_element(link_text: "SCORECARD").click

      sleep 10
      html = Nokogiri::HTML(driver.page_source)

      sleep 7
      html1 = Nokogiri::HTML(driver.page_source)
      sleep 3
      Source.create!(html: html, html1: html1, match_no: match_no)
      curr_val = curr_val + 1
      sleep 5
    end
    player_stats = TopPlayer.find(1)
    driver.navigate.to "https://iplt20.com/stats/2025"
    sleep 5

    bat = Nokogiri::HTML(driver.page_source)
    sleep 5
    elements = driver.find_elements(:css, ".cSBDisplay")[1].click
    sleep 7

    elements = driver.find_elements(:css, ".cSBListItems")[29].click

    sleep 7
    top_striker = driver.page_source
    sleep 9
    elements = driver.find_elements(:css, ".cSBDisplay")[1].click
    sleep 3
    elements = driver.find_elements(:css, ".cSBListFItems")[1].click
    sleep 3
    elements = driver.find_elements(:css, ".cSBListItems")[31].click
    sleep 3

    bowl = Nokogiri::HTML(driver.page_source)
    sleep 7
    player_stats.update(batters: bat, bowlers: bowl)
    sleep 5
    driver.navigate.to "https://iplt20.com/polls/emerging-player"
    sleep 3
    poll = Nokogiri::HTML(driver.page_source)
    sleep 5

    player_stats.update(batters: bat, bowlers: bowl, top_strikers: top_striker)
    emerging_players = EmergingPlayer.find(1)
    emerging_players.update(emerging_players: poll)
    # render json: { venue: venue.as_json,
    #                match_no: match_no,
    #                innings_I: innings_I.as_json,
    #                team_I: team_I.as_json,
    #                innings_II: innings_II.as_json,
    #                team_II: team_II.as_json,
    #                winner: winner.as_json,
    #                referee: referee.as_json,
    #                date: date.as_json,
    #                third_umpire: third_umpire.as_json,
    #                first_batting: first_batting.as_json,
    #                toss_details: toss_text.as_json,
    #                umpire_names: onfield_umpire.as_json,
    #                teams: team_text.as_json,
    #                batsmen_data: batsmen_data.as_json,
    #                extras: extras,
    #                bowlers_data: bowlers_data.as_json,
    #                batsmen_data_II: batsmen_data_II.as_json,
    #                extras_II: extras_II.as_json,
    #                bowlers_data_II: bowlers_data_II.as_json,
    #                best_partnership: best_partnership.as_json,
    #                top_run_getter: top_run_getter.as_json,
    #                top_wicket_taker: top_wicket_taker.as_json,
    #                max_runs: max_runs.as_json,
    #                max_wickets: max_wickets.as_json,
    #                eco_bowler: eco_bowler.as_json,
    #                mvp: mvp.as_json,
    #                man_of_the_match: man_of_the_match.as_json,
    #                top_batsmen: top_batsmen.as_json,
    #                top_bowlers: top_bowlers.as_json,
    #                first_tab: first_tab,
    #                second_tab: second_tab,
    #                batsmen_run: batsmen_run,
    #                batsmen_run_II: batsmen_run_II,
    #                batsmen_name: batsmen_name,
    #                batsmen_name_II: batsmen_name_II }
    driver.quit
  end
end
