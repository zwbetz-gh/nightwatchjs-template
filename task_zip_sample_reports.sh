#!/usr/bin/env bash

echo "Cleaning..."
rm -rf sample_reports/*

echo "Generating Nightwatch Reports..."
npm run report

echo "Generating Nightwatch Tags Reports..."
npm run tags

echo "Zipping Nightwatch Reports..."
tar -c -z -f sample_reports/nightwatch_report.zip \
  tests_output/report/nightwatch_report.json \
  tests_output/report/nightwatch_report.xml \
  tests_output/report/nightwatch_report.html

echo "Zipping Nightwatch Tags Reports..."
tar -c -z -f sample_reports/nightwatch_tags_report.zip \
  tests_output/report/nightwatch_tags_report.json \
  tests_output/report/nightwatch_tags_report.html

echo "Completed in ${SECONDS}s"
