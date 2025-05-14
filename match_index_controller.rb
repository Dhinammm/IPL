require "rubygems"
require "open-uri"
require "nokogiri"
require "selenium-webdriver"
require "capybara"

class MatchIndexController < ApplicationController
  def index
    ret_val = 50
    team1 = []
    team2 = []
    matches = []
    Capybara.register_driver :selenium do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
    end

    Capybara.javascript_driver = :chrome
    Capybara.configure do |config|
      config.default_max_wait_time = 10
      config.default_driver = :selenium
    end
    html = Rails.cache.fetch("/match_index", expires_in: 24.hours) do
      options = Selenium::WebDriver::Options.chrome
      options.page_load_strategy = :eager

      driver = Selenium::WebDriver.for :chrome, options: options

      driver.navigate.to "https://www.iplt20.com/matches/results"

      sleep 6
      source = driver.page_source
      driver.quit
      source
    end

    puts html
    doc = Nokogiri::HTML(html)
    links = doc.css("a").map { |a| a["href"] }.compact.select { |href| href.include?("match/2025") }
    puts links
    ret_val = doc.at_css(".vn-matchOrder.ng-binding.ng-scope")&.text&.strip
    ret_val = ret_val.gsub("Match ", "").to_i
    links = links.map do |link|
      link.gsub("https://www.iplt20.com/match/2025/", "").to_i
    end

    matches = []
    matches = doc.css("#team_archive > li").map do |match_li|
      match_li.at_css(".vn-matchOrder")&.text&.strip
    end

    team1 = doc.css("#team_archive > li").map do |match_li|
      match_li.at_css(".vn-shedTeam h3")&.text&.strip
    end

    team2 = doc.css("#team_archive > li").map do |match_li|
      match_li.css(".vn-shedTeam")[1]&.at_css("h3")&.text&.strip
    end

    puts matches
    max_val = Match.maximum(:match_no)
    render json: {
             last_match: ret_val,
             max: max_val,
             matches: matches,
             team1: team1,
             team2: team2,
           }
  end
end
