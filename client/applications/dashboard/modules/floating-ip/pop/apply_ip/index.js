var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
var request = require('../../request');
var __ = require('locale/client/dashboard.lang.json');
var getErrorMessage = require('client/applications/dashboard/utils/error_message');

function pop(parent, callback) {

  var defaultBandwidth = HALO.settings.max_floatingip_bandwidth;
  if (defaultBandwidth) {
    config.fields[0].max = defaultBandwidth;
  }

  var props = {
    __: __,
    parent: parent,
    config: config,
    onInitialize: function(refs) {},
    onConfirm: function(refs, cb) {
      request.getNetworks().then((networks) => {
        var floatingNetwork = networks.filter((item) => item['router:external']);

        if (floatingNetwork.length > 0) {
          let floatingNetworkId = floatingNetwork[0].id;

          let data = {};
          data.floatingip = {};
          data.floatingip.floating_network_id = floatingNetworkId;

          let bandwidth = Number(refs.bandwidth.state.value) * 1024;
          data.floatingip.rate_limit = bandwidth;

          request.createFloatingIp(data).then((res) => {
            callback && callback(res.floatingip);
            cb(true);
          }).catch((error) => {
            cb(false, getErrorMessage(error));
          });
        } else {
          refs.error.setState({
            value: __.create_floatingip_error,
            hide: false
          });
          cb(false);
        }
      });
    },
    onAction: function(field, state, refs) {
      switch (field) {
        case 'bandwidth':
          refs.btn.setState({
            disabled: state.error
          });
          break;
        default:
          break;
      }
    }
  };

  commonModal(props);
}

module.exports = pop;
