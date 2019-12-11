
<template>
    <div class='olMap'>
        <h2>openlayers地图</h2>
        <div class='map'  ref='rootmap'></div>
    </div>
</template>

<script>
/* eslint-disable */
import 'ol/ol.css'
import { Map, View } from 'ol'
import mapconfig from '../mapconfig'

import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import OlLayerVector from 'ol/layer/Vector'
import OlSourceVector from 'ol/source/Vector'
import OlStyleStyle from 'ol/style/Style'
import OlStyleIcon from 'ol/style/Icon'
// 用来添加相关文字描述的
import Text from 'ol/style/Text' 
import Fill from 'ol/style/Fill'


export default {
  name: 'HomeMap',
  data () {
    return {
      name: '地图展示',
      map: null
    }
  },
    mounted () {
      var mapcontainer = this.$refs.rootmap
      this.map = new Map({
        target: mapcontainer,
        layers: mapconfig.streetmap(),
        view: new View({
        projection: 'EPSG:4326',    
        center: [mapconfig.x, mapconfig.y], 
        zoom: mapconfig.zoom
      })
    });
     this.add();
    },
    methods: {
        add(){
        let pos = proj.transform([120, 30],'EPSG:4326','EPSG:3857')
        let marker = new Overlay({
          position: pos,//设置marker的位置，也可以通过overlay.setPosition方法来设置改变
          positioning: 'center-center',//选填参数，控制marker的相对位置
          element: document.getElementById('overlay'),
          stopEvent: false//选填参数，阻止默认事件行为
        })
        this.map.addOverlay(marker)
      }
    },
}

</script>

<style lang='less'>
    .olMap{
        width: 100%;
        .map{
            height: 900px;
            .ol-attribution{
                display: block
            }
            .ol-zoom {
                display: block
            }
        }
    }
</style>