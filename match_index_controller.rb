require "rubygems"
require "open-uri"
require "nokogiri"
require "selenium-webdriver"

class MatchIndexController < ApplicationController
  @@cached_html = nil
  @@cached_at = nil

  def index
    ret_val = 50
    team1 = []
    team2 = []
    matches = []

    if @@cached_html.nil? || @@cached_at.nil? || @@cached_at < 24.hours.ago
      puts "CACHE MISS: Fetching fresh HTML"
      options = Selenium::WebDriver::Options.chrome
      options.page_load_strategy = :eager

      driver = Selenium::WebDriver.for :chrome, options: options
      driver.navigate.to "https://www.iplt20.com/matches/results"
      sleep 6
      @@cached_html = driver.page_source
      @@cached_at = Time.now
      driver.quit
    else
      puts "CACHE HIT: Using cached HTML"
    end

    html = @@cached_html
    doc = Nokogiri::HTML(html)

    links = doc.css("a").map { |a| a["href"] }.compact.select { |href| href.include?("match/2025") }
    ret_val = doc.at_css(".vn-matchOrder.ng-binding.ng-scope")&.text&.strip
    ret_val = ret_val.gsub("Match ", "").to_i if ret_val

    links = links.map { |link| link.gsub("https://www.iplt20.com/match/2025/", "").to_i }

    matches = doc.css("#team_archive > li").map do |match_li|
      match_li.at_css(".vn-matchOrder")&.text&.strip
    end

    team1 = doc.css("#team_archive > li").map do |match_li|
      match_li.at_css(".vn-shedTeam h3")&.text&.strip
    end

    team2 = doc.css("#team_archive > li").map do |match_li|
      match_li.css(".vn-shedTeam")[1]&.at_css("h3")&.text&.strip
    end

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
