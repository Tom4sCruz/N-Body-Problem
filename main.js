let n = 500;
let bodies = [];
let accelerations = [];

const G = 1;
const DELTA_TIME = 1;

const MASS = 0.5;
const ABS_VEL = 0;
const BODY_DIAMETER = 3;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i=0; i < n; i++) {
        let x = windowWidth/2 + 2000 * Math.cos(2 * Math.PI * Math.random());
        let y = windowHeight/2 + 2000 * Math.sin(2 * Math.PI * Math.random());
        bodies[i] = new Body( windowWidth * Math.random(), windowHeight * Math.random(), MASS, ABS_VEL * Math.random(), 2 * Math.PI * Math.random() , floor(255 * Math.random()), floor(255 * Math.random()), floor(255 * Math.random()));
    }

    for (let i=0; i < n; i++) {
        accelerations[i] = new Array(n);
    }
}

function draw() {
    background(0, 50);
    for (let i=0; i < n; i++) {
        bodies[i].update(i);
        bodies[i].display();
    }


}

class Body {
    constructor(x, y, mass, abs_vel, heading_angle, red, green, blue) {
        this.position = createVector(x, y);
        this.velocity = createVector(abs_vel * Math.cos(heading_angle), abs_vel * Math.sin(heading_angle));
        this.mass = mass;

        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    update(own_index) {
        if (this.position.x < 0 || this.position.x > windowWidth) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y < 0 || this.position.y > windowHeight) {
            this.velocity.y = -this.velocity.y;
        }

        
        let ax=0, ay=0;
        let dx, dy;
        for (let i=0; i < n; i++) {
            if (i == own_index) {
                ax += 0;
                ay += 0;
            } else {
                if( dist(this.position.x, this.position.y, bodies[i].position.x, bodies[i].position.y) <= BODY_DIAMETER ) {
                    ax += 0;
                    ay += 0;
                } else {
                    dx = bodies[i].position.x - this.position.x;
                    dy = bodies[i].position.y - this.position.y;

                    let distance = dist(this.position.x, this.position.y, bodies[i].position.x, bodies[i].position.y);
                    let ag = G * bodies[i].mass / distance ** 2;

                    ax += ag * dx / distance;
                    ay += ag * dy  / distance;
                }
            }
        }

        this.velocity.x += ax * DELTA_TIME;
        this.velocity.y += ay * DELTA_TIME;

        this.position.x += this.velocity.x * DELTA_TIME;
        this.position.y += this.velocity.y * DELTA_TIME;
    }

    display() {
        noStroke();
        fill(this.red, this.green, this.blue);
        circle(this.position.x, this.position.y, BODY_DIAMETER);
    }
}