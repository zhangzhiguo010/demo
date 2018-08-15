window.Model = function(options){
    let databaseName = options.databaseName
    return {
        init: function(){
            var APP_ID = '1n9BKnHMeQgn3jBPP4UB3VID-gzGzoHsz'
            var APP_KEY = 'I2zWo0TFk7lidj1mCNUeuBeR'
            AV.init({appId: APP_ID,appKey: APP_KEY})
        },
        fetch: function(){
            var query = new AV.Query(databaseName)
            return query.find()        //返回promise
        },
        save: function(object){
            var XXX = AV.Object.extend(databaseName)
            var xxx = new XXX()
            return xxx.save(object)                       //返回promise
        }
    }
}