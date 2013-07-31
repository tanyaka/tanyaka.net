$(document).ready(function ()
{
    var Nav = Backbone.Model.extend({});

    var NavCollection = Backbone.Collection.extend({
        model: Nav,
        comparator: function (nav)
        {
            return nav.get("key");
        }
    });

    var NavView = Backbone.View.extend({
        el: $('#main_nav ul'),
        template : Handlebars.compile($('#menu-tmpl').html()),

        render: function ()
        {
            if(this.el.length) this.el.empty();
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var Video = Backbone.Model.extend({});

    var ContentView = Backbone.View.extend({
        model : Video,
        el: $('#main'),
        template : Handlebars.compile($('#content-tmpl').html()),

        events: {
          "click .video_btn"   : "openVideoLayer"
        },

        render: function ()
        {
            var sg = this;
            $(this.el).fadeOut('fast', function() {
                $(sg.el).empty();
                sg.$el.html(sg.template(sg.model.toJSON()));

                if( $('#miralab').length ) {
                    swfobject.embedSWF("swf/mira.swf", "miralab", "368", "62", "9.0.0", "swf/expressInstall.swf");
                }

                if($("#fanta_banner").length) {
                    var flashvars = {},
                    params = {wmode:"transparent"},
                    attributes = {};
                    swfobject.embedSWF("swf/fantarize_banner.swf", "fanta_banner", "728", "400", "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
                }
                
                if($("#cartoon").length) {
                    swfobject.embedSWF("swf/light.swf", "cartoon", "600", "300", "9.0.0", "swf/expressInstall.swf");
                }
                $(sg.el).fadeIn('fast');
            });
        },

        openVideoLayer: function(e) {
            e.preventDefault();
            var video = new Video({title: $(e.target).data('name'), width: $(e.target).data('width'), height: $(e.target).data('height')});
            videoView = new VideoView({model: video});
            videoView.render();
        },

        cleanup: function() {
            this.undelegateEvents();
        }

    });
        
    var videoView;
    
    var VideoView = Backbone.View.extend({
        el: $('#video_wrapper'),
        template : Handlebars.compile($('#video-tmpl').html()),
        flashVideo : false,

        initialize: function() {
            $(window).on("resize",this.resizeContext)
        },

        events: {
          "click #close_btn"                        : "remove"
        },

        render: function ()
        {
            if(this.el.length) this.el.empty();

            var data = {title: this.model.get('title'), width: this.model.get('width'), height: this.model.get('height')};
            this.$el.html(this.template( data ));
       
            var v = document.createElement("video"); // Are we dealing with a browser that supports <video>?
            if ( !v.play ) {

                this.flashVideo = true;
                var flashvars = {
                        video_name: "../videos/"+data.title+".f4v", 
                        //video_name: "../../tanyaka.net_ver2/videos/"+data.title+".f4v", 
                        video_width: data.width, 
                        video_height: data.height
                    },
                    params = {wmode:"transparent"};
                swfobject.embedSWF("swf/video_test.swf", "flash_video", "100%", "100%", "9.0.0", "swf/expressInstall.swf", flashvars, params);             
            } else {
                var dimentions = this.getVideoSize();
                $('#video_conatiner').width(dimentions.width);
                $('#video_conatiner').css('padding-top', dimentions.paddingTop+'px');
                $('#close_btn').css('top', dimentions.paddingTop+'px');
            }
            
            this.$el.fadeIn();
            return this;
        },

        getVideoSize: function() {
            var windowH = $(window).height(),
                windowW= $(window).width(),
                newW = 0, newH =0,
                paddingTop,
                videoH = this.model.get('height'), videoW = this.model.get('width');
                
            if(videoW > windowW - 40) {
                newW = windowW - 40;
                newH = Math.round(videoH / videoW * newW);
                if(newH > windowH-4) {
                    newH = windowH-4;
                    newW = Math.round(videoW / videoH * newH);
                }
            } else if(videoH > windowH-4) {
                newH = windowH-4;
                newW = Math.round(videoW / videoH * newH);
                if(newW > windowW - 40) {
                    newW = windowW - 40;
                    newH = Math.round(videoH / videoW * newW);
                }
            }
            
            videoW = newW > 0 ? newW : videoW;
            videoH = newH > 0 ? newH : videoH;
            paddingTop = Math.round(0.5*(windowH-videoH));

            return {'width': videoW, 'height':videoH, 'paddingTop':paddingTop};
        },

        resizeContext: function() {
            if (videoView.flashVideo) return;
            var dimentions = videoView.getVideoSize();
            $('#video_conatiner').width(dimentions.width);
            $('#video_conatiner').css('padding-top', dimentions.paddingTop+'px');
            $('#close_btn').css('top', dimentions.paddingTop+'px');
        },

        remove: function (e) {
            this.$el.fadeOut();
            this.undelegateEvents();
            $(window).off("resize",this.resizeContext);
        }
    });

    var NavigationRouter = Backbone.Router.extend({
        _data: null,
        _navs: null,
        _view: null,
        _contentView: null,

        routes: {
            "article/:id": "showInfo"
        },

        initialize: function (options)
        {
            var _this = this;
            $.ajax({
                url: "js/content.json",
                dataType: 'json',
                data: {},
                async: false,
                success: function (data)
                {
                    _this._data = data;
                    _this._navs = new NavCollection(data);
                    _this._view = new NavView({ model: _this._navs });
                    _this._view.render();
                    
                    Backbone.history.loadUrl;//());
                }
            });
            return this;
        },

        showInfo: function (id)
        {
            if (this._contentView) {
                this._contentView.cleanup();
            }

            this._contentView = new ContentView({ model: this._navs.at(id) });
            $(".current").removeClass("current");
            $('#main_nav li:nth-child('+(parseInt(id)+1)+') a').addClass('current');

            this._contentView.render();
        }
    });

    var navigationRouter = new NavigationRouter;
    Backbone.history.start();

});

