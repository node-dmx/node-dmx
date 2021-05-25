/*
 * based on jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration

export const ease = {
  linear(t: number, b: number, c: number, d: number): number {
    return c * t / d + b;
  },
  inQuad(t: number, b: number, c: number, d: number): number {
    return c * (t /= d) * t + b;
  },
  outQuad(t: number, b: number, c: number, d: number): number {
    return -c * (t /= d) * (t - 2) + b;
  },
  inOutQuad(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  inCubic(t: number, b: number, c: number, d: number): number {
    return c * (t /= d) * t * t + b;
  },
  outCubic(t: number, b: number, c: number, d: number): number {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  inOutCubic(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  inQuart(t: number, b: number, c: number, d: number): number {
    return c * (t /= d) * t * t * t + b;
  },
  outQuart(t: number, b: number, c: number, d: number): number {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  inOutQuart(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  inQuint(t: number, b: number, c: number, d: number): number {
    return c * (t /= d) * t * t * t * t + b;
  },
  outQuint(t: number, b: number, c: number, d: number): number {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  inOutQuint(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  inSine(t: number, b: number, c: number, d: number): number {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  outSine(t: number, b: number, c: number, d: number): number {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  inOutSine(t: number, b: number, c: number, d: number): number {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  inExpo(t: number, b: number, c: number, d: number): number {
    return (t === 0) ? b : c * (2 ** (10 * (t / d - 1))) + b;
  },
  outExpo(t: number, b: number, c: number, d: number): number {
    return (t === d) ? b + c : c * (-(2 ** (-10 * t / d)) + 1) + b;
  },
  inOutExpo(t: number, b: number, c: number, d: number): number {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * (2 ** (10 * (t - 1))) + b;
    return c / 2 * (-(2 ** (-10 * --t)) + 2) + b;
  },
  inCirc(t: number, b: number, c: number, d: number): number {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  outCirc(t: number, b: number, c: number, d: number): number {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  inOutCirc(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  inElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158; let p = 0; let a = c;

    if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);

    return -(a * (2 ** (10 * (t -= 1))) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  outElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158; let p = 0; let a = c;

    if (t === 0) return b; if ((t /= d) === 1) return b + c; if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);

    return a * (2 ** (-10 * t)) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  inOutElastic(t: number, b: number, c: number, d: number): number {
    let s = 1.70158; let p = 0; let a = c;

    if (t === 0) return b; if ((t /= d / 2) === 2) return b + c; if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c; s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);

    if (t < 1) return -0.5 * (a * (2 ** (10 * (t -= 1))) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * (2 ** (-10 * (t -= 1))) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
  },
  inBack(t: number, b: number, c: number, d: number, s: number): number {
    if (s === undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  outBack(t: number, b: number, c: number, d: number, s: number): number {
    if (s === undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  inOutBack(t: number, b: number, c: number, d: number, s: number): number {
    if (s === undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  },
  inBounce(t: number, b: number, c: number, d: number): number {
    return c - exports.ease.outBounce(d - t, 0, c, d) + b;
  },
  outBounce(t: number, b: number, c: number, d: number): number {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    }
    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;

  },
  inOutBounce(t: number, b: number, c: number, d: number): number {
    if (t < d / 2) return exports.ease.inBounce(t * 2, 0, c, d) * 0.5 + b;
    return exports.ease.outBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  },
};

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
