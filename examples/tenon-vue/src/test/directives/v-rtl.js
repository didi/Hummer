const {DHummerExtService, DHummerTitleBarService} = __GLOBAL__;
let commonParams = DHummerExtService && DHummerExtService.getCommonParams ();

const vRtl = {
  beforeMount (el, {value}) {
    return;
    if (!/^ar/.test ((commonParams.lang || '').toLowerCase ())) return;
    if (value === 'text') {
      el.style = {
        transform: 'scaleX(-1)',
        textAlign: 'right',
      };
    } else {
      el.style = {
        transform: 'scaleX(-1)',
      };
    }
  },
  mounted (el, {value}) {},
};

export default vRtl;
