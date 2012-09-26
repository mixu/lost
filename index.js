// traverses inside the context until all the lookups are done
function traverse(context, lookups) {
  var cname;
  if(lookups.length === 0) return context;
  while(cname = lookups.shift()) {
    if(!context[cname]) {
      context[cname] = {};
    }
    context = context[cname];
  }
  return context;
}

function resolver(defaultScope) {
  var o = {
    set: function(path, value, scope) {
      var lookups = path.split('.'),
          last = lookups.pop(),
          current = traverse((scope || defaultScope), lookups);
      current[last] = value;
      o.emit('change', path, value, scope);
    },
    get: function(path, scope) {
      var lookups = path.split('.'),
          last = lookups.pop(),
          current = traverse((scope || defaultScope), lookups);
      return current[last];
    },
    remove: function(name, scope) {
      delete (scope || defaultScope)[name];
      o.emit('change', name, undefined, scope);
    },
    resolver: resolver,
    emit: function(eventType, name, value, scope) { },
    scope: defaultScope
  };
  return o;
};

module.exports = resolver({});
