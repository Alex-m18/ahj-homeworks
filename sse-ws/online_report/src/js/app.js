import OnlineReportWidget from './OnlineReportWidget';

const url = 'https://alex-m18-ahj-sse-report.herokuapp.com/sse';

const report = new OnlineReportWidget(url);
report.bindToDOM(document.querySelector('#online_report_widget_container'));
report.init();
