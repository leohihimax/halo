var fetch = require('../../cores/fetch');

module.exports = {
  getHypervisorList: function(pageLimit) {
    if(isNaN(Number(pageLimit))) {
      pageLimit = 10;
    }

    var url = '/proxy/nova/v2.1/' + HALO.user.projectId + '/images/detail?all_tenants=1&limit=' + pageLimit;
    return fetch.get({
      url: url
    }).then((res) => {
      res._url = url;
      return res;
    });
  },
  getHypervisorByIdOrName: function(str) {
    var url = '/proxy/nova/v2.1/' + HALO.user.projectId + '/os-hypervisors/' + str;
    return fetch.get({
      url: url
    }).then((res) => {
      res._url = url;
      return res;
    });
  },
  getNextList: function(nextUrl) {
    var url = '/proxy/nova/v2.1/' + nextUrl;
    return fetch.get({
      url: url
    }).then((res) => {
      res._url = url;
      return res;
    });
  },
  disableHost: function(data) {
    return fetch.put({
      url: '/proxy/nova/v2.1/' + HALO.user.projectId + '/os-services/disable',
      data: data
    });
  },
  enableHost: function(data) {
    return fetch.put({
      url: '/proxy/nova/v2.1/' + HALO.user.projectId + '/os-services/enable',
      data: data
    });
  }
};