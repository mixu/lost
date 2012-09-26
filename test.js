var assert = require('assert'),
    util = require('util');

exports['given a resolver'] = {

  beforeEach: function() {
    this.r = require('./index.js');
  },

  'can set a simple path': function() {
    this.r.set('foo', 'foo');
    console.log(this.r.get('foo'));
    this.r.set('foo', 'abc');
    console.log(this.r.get('foo'));
  },

  'can set a nested path': function() {
    this.r.set('app.foo.bar.baz', { value: 'aaa' });
    console.log(this.r.get('app.foo.bar.baz'));
    console.log(util.inspect(this.r.scope, null, 5, true));
  },

  'can get a undefined item': function() {
    console.log(this.r.get('undefined'));
    console.log(this.r.get('is.undefined'));
    console.log(this.r.get('is.really.undefined'));
  },

  'can create a separate scope': function() {
    var s = this.r.resolver({ abc: { def: 'ghi' }});
    console.log(s.get('abc.def'));
    console.log(this.r.get('abc.def'));
  },

  'can get and set in a specific scope': function() {
    var s = this.r.resolver({});
    s.set('abc.def', 'foo');
    s.set('other', 'other', this.r.scope);
    console.log(this.r.get('abc.def', s.scope));
    console.log(this.r.get('abc.def'));
    console.log(this.r.get('other', s.scope));
    console.log(this.r.get('other'));
  }

};

// if this module is the script being run, then run the tests:
if (module == require.main) {
  var mocha = require('child_process').spawn('mocha', [ '--colors', '--ui', 'exports', '--reporter', 'spec', __filename ]);
  mocha.stdout.pipe(process.stdout);
  mocha.stderr.pipe(process.stderr);
}
