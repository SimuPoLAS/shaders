#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_backbuffer;

vec3 dead = vec3(0.0);

void main() {
    vec2 pos = (gl_FragCoord.xy / u_resolution.xy);
    vec2 pixelsize = 1.0 / u_resolution.xy;

    // define starting color
    vec3 color = dead;
    // take time as value for color pulsation
    float x = u_time / 2.0;
    // according to a trigonometric identity, sin2(x) + cos2(x) = 1 is given at all times
    vec3 live = vec3((sin(x) * sin(x)), 0.2, (cos(x) * cos(x)));

    vec2 rb_sum = vec2(0.0);
    // check neighbours
    // 6-7-8
    // 4-x-5
    // 1-2-3
    rb_sum += texture2D(u_backbuffer, pos + vec2(-1.0, -1.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(-1.0, 0.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(-1.0, 1.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(1.0, -1.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(1.0, 0.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(1.0, 1.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(0.0, -1.0) * pixelsize).rb;
    rb_sum += texture2D(u_backbuffer, pos + vec2(0.0, 1.0) * pixelsize).rb;
    // calculate sum, taking all the R and B values
    float sum = (rb_sum.x + rb_sum.y);

    // get the currently targeted pixel, the "x" in our small diagram
    vec4 self = texture2D(u_backbuffer, pos);
    // if self was not alive previously
    if ((self.r + self.b) < 0.1) {
        // resurrection
        if (sum > 2.9 && sum < 3.1) {
            color = live;
        }
    } else {
        // death by solitude
        if (sum < 1.1) {
            color = dead;
        // death by overpopulation
        } else if (sum > 3.9) {
            color = dead;
        // two or three neighbours, live!
        } else {
            color = live;
        }
    }

    // distance determines wether our current pixel is affected by mouse_pos
    float dist = distance(gl_FragCoord.xy, u_mouse.xy);
    // if current pixel is directly under the cursor
    if (dist <= 15.0 && dist >= 10.0) {
        color = live;
    }

    gl_FragColor = vec4(color.rgb, 1.0);
}