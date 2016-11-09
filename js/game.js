var game = {
    level: 3,
    movelock: true,
    debug: false,
    gameimg: "",
    timeCounter: "",
    currentTime: -1,
    moveCounter: 0,
    text: "",

    initGame: function(game_array) {
        $(".main-block").height($(".main-block").width());

        if (game_array) {
            // debug模式，添加一个显示标签
            if (this.debug) {
                $(".glance-button-block").append("<span class=\"debug-badge pull-left\">" + game_array + "</span>");
            }

            var that = this;
            game_array.forEach(function(element, index, array) {
                $(".main-block").append("<div class=\"puzzle-img pieces-" + that.level + "-" + element + " position-" + that.level + "-" + (index + 1) + "\"><img class=\"img-responsive\" src=\"img/wrap.png\"></div>");
            });
            // var mapArray = puzzleMap3[Math.floor(Math.random()*100)];
            // this.mapRun(mapArray);

        } else {
            for (var i = 1; i < this.level * this.level; i++) {
                $(".main-block").append("<div class=\"puzzle-img pieces-" + this.level + "-" + i + " position-" + this.level + "-" + i + "\"><img class=\"img-responsive\" src=\"img/wrap.png\"></div>");
            }
        }

        // 随机生成图片的代码
        // var imgList = ["al.jpeg", "ls.jpeg", "mk.jpeg", "IMG_4176.JPG", "n2.jpeg", "nw.png", "pqh.jpeg", "tl.jpeg", "zqq.jpeg", "puzzle3.jpg", "puzzle2.jpg", "puzzle1.jpg", "20150105143412.jpg"];
        // this.gameimg = "img/"+imgList[Math.floor(Math.random()*imgList.length)];
        $(".puzzle-img").css("background-image", "url(" + this.gameimg + ")");
        $(".victory-block").append("<img src=\"" + this.gameimg + "\" class=\"img-responsive\">");

        $('#button_glance').popover({
            animation: false,
            placement: "left",
            html: true,
            content: "<img src=\"" + game.gameimg + "\" class=\"glance-img\">"
        });
    },

    moveUp: function(callback) {
        $('#button_glance').popover('hide');
        if (this.movelock) {
            var blank = this.getBlank();
            var target = blank + this.level;
            if ($(".main-block").children(".position-" + this.level + "-" + target).size() === 0) {
                return;
            }
            var that = this;
            this.movelock = false;
            $(".main-block").children(".position-" + this.level + "-" + target).addClass("moveUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).addClass("position-" + that.level + "-" + blank).removeClass("moveUp position-" + that.level + "-" + target);
                that.movelock = true;
                if (that.moveCounter === 0) {
                    // 首次滑动时执行计时器代码
                    that.startCount();
                }
                that.moveCounter += 1;
                // 显示胜利（如果没有胜利不执行任何动作）
                that.showVictory();
                if (callback) {
                    callback();
                }
            });
        }
    },
    moveDown: function(callback) {
        $('#button_glance').popover('hide');
        if (this.movelock) {
            var blank = this.getBlank();
            var target = blank - this.level;
            if ($(".main-block").children(".position-" + this.level + "-" + target).size() === 0) {
                return;
            }
            var that = this;
            this.movelock = false;
            $(".main-block").children(".position-" + this.level + "-" + target).addClass("moveDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).addClass("position-" + that.level + "-" + blank).removeClass("moveDown position-" + that.level + "-" + target);
                that.movelock = true;
                if (that.moveCounter === 0) {
                    // 首次滑动时执行计时器代码
                    that.startCount();
                }
                that.moveCounter += 1;
                // 显示胜利（如果没有胜利不执行任何动作）
                that.showVictory();
                if (callback) {
                    callback();
                }
            });
        }
    },
    moveLeft: function(callback) {
        // 当空格在最右边时不能向左移
        $('#button_glance').popover('hide');
        if (this.movelock) {
            var blank = this.getBlank();
            for (var i = this.level; i <= (this.level * this.level); i += this.level) {
                if (blank === i) {
                    return;
                }
            }

            this.movelock = false;
            var target = blank + 1;
            var that = this;
            $(".main-block").children(".position-" + this.level + "-" + target).addClass("moveLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).addClass("position-" + that.level + "-" + blank).removeClass("moveLeft position-" + that.level + "-" + target);
                that.movelock = true;
                if (that.moveCounter === 0) {
                    // 首次滑动时执行计时器代码
                    that.startCount();
                }
                that.moveCounter += 1;
                // 显示胜利（如果没有胜利不执行任何动作）
                that.showVictory();
                if (callback) {
                    callback();
                }
            });
        }

    },
    moveRight: function(callback) {
        // 当空格在最左边时不能向右移
        $('#button_glance').popover('hide');
        if (this.movelock) {
            var blank = this.getBlank();
            for (var i = 1; i <= (this.level * this.level); i += this.level) {
                if (blank === i) {
                    return;
                }
            }

            this.movelock = false;
            var target = blank - 1;
            var that = this;
            $(".main-block").children(".position-" + this.level + "-" + target).addClass("moveRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).addClass("position-" + that.level + "-" + blank).removeClass("moveRight position-" + that.level + "-" + target);
                that.movelock = true;
                if (that.moveCounter === 0) {
                    // 首次滑动时执行计时器代码
                    that.startCount();
                }
                that.moveCounter += 1;
                // 显示胜利（如果没有胜利不执行任何动作）
                that.showVictory();
                if (callback) {
                    callback();
                }
            });
        }

    },
    getBlank: function() {
        // 返回空格的索引
        if (this.level !== 3 && this.level !== 4 && this.level !== 5) {
            return -1;
        }
        var count = this.level * this.level;
        for (var i = count; i > 0; i--) {
            if ($(".main-block").children(".position-" + this.level + "-" + i).size() === 0) {
                return i;
            }
        }
    },

    showGlance: function() {
        bootbox.alert("<img src=\"" + this.gameimg + "\" class=\"glance-img\">");
    },

    showVictory: function() {
        var that = this;
        if (this.checkVictory()) {
            $(".victory-block").removeClass("hide").addClass("fadeIn").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('.victory-bottom').addClass("tada");
            });
            this.movelock = false;
            $('#button_glance').popover('hide');
            this.stopCount();
            $('.victory-top').html((that.currentTime >= 60
                ? (Math.floor(that.currentTime / 60) + "分")
                : "") + (that.currentTime % 60) + "秒就拼出来了，你也是蛮拼的！");
            $('.victory-bottom').html(that.text === ""
                ? "恭喜！"
                : that.text);
            //			$.ajax({
            //				type: 'POST',
            //				url: "action.php?r=finishlog",
            //				data: {
            //					sessid: that.sessid,
            //					gamestep: that.moveCounter,
            //					gametime: that.currentTime
            //				}
            //			});

            share_title_timeline = "我只用了" + (that.currentTime >= 60
                ? (Math.floor(that.currentTime / 60) + "分")
                : "") + (that.currentTime % 60) + "秒就拼出来了，放胆过来和我拼!";
            share_desc = "我只用了" + (that.currentTime >= 60
                ? (Math.floor(that.currentTime / 60) + "分")
                : "") + (that.currentTime % 60) + "秒就拼出来了，放胆过来和我拼!";

            //			setReady();
            // var showDialog = function(){
            // 	bootbox.dialog({

            // 		title: "您用了"+(that.currentTime>=60?(Math.floor(that.currentTime/60)+"分"):"")+(that.currentTime%60)+"秒就拼出了XXX！",
            // 		message: "<div class='img-final'><img src=\""+game.gameimg+"\" class=\"img-responsive\">"+(that.text===""? "": "<p class='word-final'>"+that.text+"</p>")+"</div>",
            // 		closeButton: false,
            // 		backdrop: false,
            // 		animate: false,
            // 		className: "victory-modal",
            // 		buttons: {
            // 			success: {
            // 				label: "<span class=\"glyphicon glyphicon-share\"></span> 分享",
            // 				className: "btn-primary",
            // 				callback: function() {
            // 				}
            // 			},
            // 			danger: {
            // 				label: "<span class=\"glyphicon glyphicon-pencil\"></span> 制作",
            // 				className: "btn-primary",
            // 				callback: function() {
            // 				}
            // 			}
            // 		}
            // 	});
            // };
            // setTimeout(showDialog,2000);
        }

    },

    checkVictory: function() {
        // 用pieces类序号是否等于position序号来判断是否胜利
        var blockList = $(".main-block").children();
        for (var i = 0; i < blockList.length; i++) {
            var classString = $(blockList[i]).attr("class");
            var pieceIndex = classString.split("pieces")[1].split("-")[2].split(" ")[0];
            var positionIndex = classString.split("position")[1].split("-")[2];
            // console.log(pieceIndex+" "+positionIndex);
            if (pieceIndex !== positionIndex) {
                return false;
            }
        }
        return true;
    },

    // 开始计数器的代码
    startCount: function() {
        var that = this;
        var count = function() {
            that.currentTime += 1;
            $(".time-badge").html(getTimeString());
            that.timeCounter = setTimeout(count, 1000);
        };
        // 生成时间字符串，不足2位用0补足
        var getTimeString = function() {
            var resultStr = "";
            if (Math.floor(that.currentTime / 60) < 10) {
                resultStr = resultStr + "0" + Math.floor(that.currentTime / 60);
            } else {
                resultStr = resultStr + Math.floor(that.currentTime / 60);
            }
            resultStr = resultStr + ":";
            if ((that.currentTime % 60) < 10) {
                resultStr = resultStr + "0" + (that.currentTime % 60);
            } else {
                resultStr = resultStr + (that.currentTime % 60);
            }
            return resultStr;
        };
        count();
    },

    // 停止计数器的代码
    stopCount: function() {
        clearTimeout(this.timeCounter);
    },

    // 按照已有的随机路径进行洗牌
    mapRun: function(route) {
        // 先按照正常状态进行填充
        for (var i = 1; i < this.level * this.level; i++) {
            $(".main-block").append("<div class=\"puzzle-img pieces-" + this.level + "-" + i + " position-" + this.level + "-" + i + "\"><img class=\"img-responsive\" src=\"img/wrap.png\"></div>");
        }
        var index = 0;
        var that = this;
        var getNext = function() {
            if (route.charAt(index) === "u") {
                that.moveDown(getNext);
            } else if (route.charAt(index) === "d") {
                that.moveUp(getNext);
            } else if (route.charAt(index) === "l") {
                that.moveRight(getNext);
            } else if (route.charAt(index) === "r") {
                that.moveLeft(getNext);
            } else {
                return;
            }
            index += 1;
        };
        setTimeout(getNext, 1000);

    }
};
