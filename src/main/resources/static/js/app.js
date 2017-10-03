//@author KevinMendieta

var Module = (function() {
    var api = apiclient,
        selectedBp = false,
        offset,
	    authorName,
        blueprints,
        currentBlueprint,
        canvas,
        ctx;

    function getOffset(obj) {
        var offsetLeft = 0;
        var offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while(obj = obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
    }

    var str = function(tag){ return '"' + tag + '"';};

    var cleanRows = function(){ $('#myTable tbody').find("tr").remove();};

    var mapBlueprints = function(bprints){
        selectedBp = false;
        cleanRows();
        document.getElementById("authorNameShow").innerHTML = authorName + " Blueprints:";

        blueprints = bprints.map(function(blueprint){
            return {blueprintName: blueprint.name, totalPoints:blueprint.points.length};
        });

        blueprints.map(function(blueprint){
            let content = '<tr><td class="myTd">' + blueprint.blueprintName + '</td><td class="myTd">' + blueprint.totalPoints + '</td><td class="myTd">' + "<input type='button' class='button' value='draw' onclick='Module.getBlueprintsByAuthorNameAndBlueprintName(" + str(authorName) + "," + str(blueprint.blueprintName) + ")'></td></tr>";
			$('#myTable tbody').append(content);
        });

        document.getElementById("totalPoints").innerHTML = "Total points: " + blueprints.reduce(function(total, blueprint){
                return total + blueprint.totalPoints;
        }, 0);

    };

    var drawBlueprint = function(bprint){
        selectedBp = true;
        currentBlueprint = bprint;
        document.getElementById("currentBlueprintName").innerHTML = "Current Blueprint: " + bprint.name;
        ctx.fillRect(0,0,500,500);
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        for (let i = 0; i < bprint.points.length - 1; i++) {
            let firstPoint = bprint.points[i];
            let secondPoint = bprint.points[i + 1];
            ctx.moveTo(firstPoint.x, firstPoint.y);
            ctx.lineTo(secondPoint.x, secondPoint.y);
        }
        ctx.stroke();
        ctx.moveTo(0,0);
    };

    var eventHandler = function(event) {
        if (selectedBp){
            offset = getOffset(canvas);
            var x = Math.ceil(event.pageX - offset.left);
            var y = Math.ceil(event.pageY - offset.top);
            currentBlueprint.points.push({x, y});
            drawBlueprint(currentBlueprint);
        }
    }

    return {
        updateAuthorName: function(newAuthorName){
            authorName = newAuthorName;
        },

        getBlueprintsByAuthorName: function(newAuthorName){
            api.getBlueprintsByAuthor(newAuthorName, mapBlueprints);
        },

        getBlueprintsByAuthorNameAndBlueprintName: function(newAuthorName, newBlueprintName){
            api.getBlueprintsByNameAndAuthor(newAuthorName, newBlueprintName, drawBlueprint);
        },

        init: function(){
            canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext("2d");
            if (window.PointerEvent) {
                canvas.addEventListener("pointerdown", eventHandler);
            } else {
                canvas.addEventListener("mousedown", eventHandler);
            }
        },

        updateCurrentBlueprint : function(){
            if (selectedBp){
                api.updateAuthorBlueprint(currentBlueprint, mapBlueprints);
            }
        },

        createNewBlueprint : function(bpName){
            if (bpName != "") {
                selectedBp = true;
                currentBlueprint = {"author" : authorName, "points" : [], "name" : bpName};
                drawBlueprint(currentBlueprint);
            } else {
                alert("Please put a name for the new Blueprint");
            }            
        },

        deleteCurrentBlueprint(){
            if (selectedBp) {
                api.deleteBlueprint(currentBlueprint, mapBlueprints);
            }
        }
    };

})();
