import{Component, NgZone}from'@angular/core';
import { NavController, MenuController, Events}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import { BluetoothPage }from '../bluetooth/bluetooth';
import { TimelinePage }from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { PebblPage } from '../pebbl/pebbl';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import * as firebase from 'firebase';

declare var d3: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  adventures: any;
  adventuresDetail: any;
  arrayLength: any;
  firstMem: any;
  userId: any;

  constructor(private _zone: NgZone, public navCtrl: NavController, private checkinService: CheckinService,
    public menu: MenuController, public events: Events) {
      this.navPages = [
        { title: 'Timeline', icon: 'center', path: 'img/Timeline_white.svg', component: TimelinePage },
        { title: 'Check In', icon: 'center', path: 'img/Checkin_white.svg', component: CheckinPage },
        { title: 'Adventures', icon: 'center', path: 'img/Adventure_white.svg', component: AdventuresPage }
      ];
    }

    pushPage(page) {
      this.navCtrl.push(page.component);
    }

    pushInstantMemory(){
      this.navCtrl.push(PebblPage);
    }

    createChart() {

      var width = 500,
      height = 500,
      start = 0,
      end = 2.25,
      numSpirals = 3,
      margin = {top:50,bottom:50,left:50,right:50};

      var theta = function(r) {
        return numSpirals * Math.PI * r;
      };

      var color = d3.scaleOrdinal(d3.schemeCategory10);

      var r = d3.min([width, height]) / 2 - 40;

      var radius = d3.scaleLinear()
      .domain([start, end])
      .range([40, r]);

      var svg = d3.select("#vis").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var points = d3.range(start, end + 0.001, (end - start) / 1000);

      var spiral = d3.radialLine()
      .curve(d3.curveCardinal)
      .angle(theta)
      .radius(radius);

      var path = svg.append("path")
      .datum(points)
      .attr("id", "spiral")
      .attr("d", spiral)
      .style("fill", "none")
      .style("stroke", "steelblue");

      var spiralLength = path.node().getTotalLength(),
      N = 365,
      barWidth = (spiralLength / N) - 1;
      var someData = [];
      for (var i = 0; i < N; i++) {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        someData.push({
          date: currentDate,
          value: Math.random(),
          group: currentDate.getMonth()
        });
      }


      var timeScale = d3.scaleTime()
      .domain(d3.extent(someData, function(d){
        return d.date;
      }))
      .range([0, spiralLength]);

      // yScale for the bar height
      var yScale = d3.scaleLinear()
      .domain([0, d3.max(someData, function(d){
        return d.value;
      })])
      .range([0, (r / numSpirals) - 30]);

      svg.selectAll("rect")
      .data(someData)
      .enter()
      .append("rect")
      .attr("x", function(d,i){

        var linePer = timeScale(d.date),
        posOnLine = path.node().getPointAtLength(linePer),
        angleOnLine = path.node().getPointAtLength(linePer - barWidth);

        d.linePer = linePer; // % distance are on the spiral
        d.x = posOnLine.x; // x postion on the spiral
        d.y = posOnLine.y; // y position on the spiral

        d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

        return d.x;
      })
      .attr("y", function(d){
        return d.y;
      })
      .attr("width", function(d){
        return barWidth;
      })
      .attr("height", function(d){
        return yScale(d.value);
      })
      .style("fill", function(d){return color(d.group);})
      .style("stroke", "none")
      .attr("transform", function(d){
        return "rotate(" + d.a + "," + d.x  + "," + d.y + ")"; // rotate the bar
      });

      // add date labels
      var tF = d3.timeFormat("%b %Y"),
      firstInMonth = {};

      svg.selectAll("text")
      .data(someData)
      .enter()
      .append("text")
      .attr("dy", 10)
      .style("text-anchor", "start")
      .style("font", "10px arial")
      .append("textPath")
      // only add for the first of each month
      .filter(function(d){
        var sd = tF(d.date);
        if (!firstInMonth[sd]){
          firstInMonth[sd] = 1;
          return true;
        }
        return false;
      })
      .text(function(d){
        return tF(d.date);
      })
      // place text along spiral
      .attr("xlink:href", "#spiral")
      .style("fill", "grey")
      .attr("startOffset", function(d){
        return ((d.linePer / spiralLength) * 100) + "%";
      })


      var tooltip = d3.select("#vis")
      .append('div')
      .attr('class', 'tooltip')
      .style('background', '#eee')
      .style('box-shadow', '0 0 5px #999999')
      .style('color', '#333')
      .style('font-size', '12px')
      .style('left', '130px')
      .style('padding', '10px')
      .style('position', 'absolute')
      .style('text-align', 'center')
      .style('top', '95px')
      .style('z-index', '10')
      .style('display', 'block')
      .style('opacity', '0');

      tooltip.append('div')
      .attr('class', 'date');
      tooltip.append('div')
      .attr('class', 'value');

      svg.selectAll("rect")
      .on('mouseover', function(d) {

        tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
        tooltip.select('.value').html("Value: <b>" + Math.round(d.value*100)/100 + "<b>");

        d3.select(this)
        .style("fill","#FFFFFF")
        .style("stroke","#000000")
        .style("stroke-width","2px");

        tooltip.style('display', 'block');
        tooltip.style('opacity',2);

      })
      .on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX - 25) + 'px');
      })
      .on('mouseout', function(d) {
        d3.selectAll("rect")
        .style("fill", function(d){return color(d.group);})
        .style("stroke", "none")

        tooltip.style('display', 'none');
        tooltip.style('opacity',0);
      });
    }

    ionViewDidLoad() {
      console.log("home.ts - Entered home page");
      this.menu.enable(true);
      this.createChart();
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.userId = firebase.auth().currentUser.uid;
          let userProfile = firebase.database().ref('users');
          let that = this;
          userProfile.child(this.userId).on('value', function(snapshot) {
            if(snapshot.val().firstMem){
              that.firstMem = snapshot.val().firstMem;
            }else{
              that.firstMem = null;
            }
          });
        }
      });
    }

  }
