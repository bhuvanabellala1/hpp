import{Component}from'@angular/core';
import { NavController, MenuController}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import {TimelinePage}from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
declare var d3: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  public venuesData: any;
  public venue: any;

  constructor(public navCtrl: NavController, private checkinService: CheckinService,
  public menu: MenuController) {
    this.navPages = [
      { title: 'Timeline', icon: 'center', path: 'img/Timeline_Stretched.svg', component: TimelinePage },
      { title: 'Check In', icon: 'center', path: 'img/CheckIn.svg', component: CheckinPage },
      { title: 'Adventures', icon: 'center', path: 'img/Adventure_Stretched.svg', component: AdventuresPage }
    ];
    this.grabVenues();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  pushPage(page) {
    if(page.title == 'Check In'){
      this.navCtrl.push(page.component, {venue: this.venue,
                                          venueData: this.venuesData});
    }else{
      this.navCtrl.push(page.component);
    }
  }

  grabVenues(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.checkinService.searchVenues(resp.coords.latitude + "," + resp.coords.longitude)
      .then(data => {
        this.venuesData = data;
        this.venue = this.venuesData.response.venues[0];
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  createChart() {
    var margin = {top: 0, right: 0, bottom: 80, left: 0},
    width = 400 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var rect = [50,50, width - 50, height - 50];

    var n = 20, m = 4, padding = 6, maxSpeed = 3,
    radius = d3.scale.sqrt().range([0, 8]),
    color = d3.scale.category10().domain(d3.range(m));
    var nodes = [];

    for (var i in d3.range(n)){
      nodes.push({
      radius: radius(1 + Math.floor(Math.random() * 4)),
      color: color(Math.floor(Math.random() * m), 0.5),
      x:rect[0] + (Math.random() * (rect[2] - rect[0])),
      y:rect[1] + (Math.random() * (rect[3] - rect[1])),
      speedX: (Math.random() - 0.5) * 2 * maxSpeed,
      speedY: (Math.random() - 0.5) * 2 * maxSpeed});
    }

    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("svg:rect")
      .attr("width", rect[2] - rect[0])
      .attr("height", rect[3] - rect[1])
      .attr("x", rect[0])
      .attr("y", rect[1])
      .style("fill", "None")
      .style("stroke", "None");

    var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .style("fill", function(d) { return d.color; })
      .call(force.drag);

    // var polygon = svg.selectAll("polygon")
    //   .data(nodes)
    //   .enter().append("polygon")
    //   .attr("points", "151.68,194.948 223.09,187.233 257.218,124.034,286.621,189.564 357.273,202.493 304.036,250.707 313.574,321.896 251.268,286.164 186.511,317.232 201.24,246.935")
    //   // .style("fill", "pink")
    //   // .style("stroke", "#FFFFFF")
    //   .style("troke-miterlimit", "#10")
    //   .style("fill", function(d) { return d.color; })
    //   .call(force.drag);

    var flag = false;

    function tick(e) {
      force.alpha(0.1)
      circle
        .each(gravity(e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }

    // Move nodes toward cluster focus.
    function gravity(alpha) {
      return function(d) {
        if ((d.x - d.radius - 2) < rect[0]) d.speedX = Math.abs(d.speedX);
        if ((d.x + d.radius + 2) > rect[2]) d.speedX = -1 * Math.abs(d.speedX);
        if ((d.y - d.radius - 2) < rect[1]) d.speedY = -1 * Math.abs(d.speedY);
        if ((d.y + d.radius + 2) > rect[3]) d.speedY = Math.abs(d.speedY);
        d.x = d.x + (d.speedX * alpha);
        d.y = d.y + (-1 * d.speedY * alpha);
      };
    }

    // Resolve collisions between nodes.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + radius.domain()[1] + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            // r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
            r = 33.31370849898476;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
  }

  ionViewDidLoad() {
    console.log("Entering home page - enabling menu");
    this.menu.enable(true);
  }

  //
  // ionViewDidLeave() {
  //   // this.listOurUsers();
  //   this.menu.enable(false);
  // }


}
