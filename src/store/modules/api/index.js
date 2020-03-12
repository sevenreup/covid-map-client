import init from './default';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state: init(),
    getters,
    actions,
    mutations,
}