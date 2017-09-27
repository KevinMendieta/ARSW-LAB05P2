//@author KevinMendieta

var Module = (function() {
    var api = apiclient;
	var authorName;
    var blueprints;
    var str = function(tag){ return '"' + tag + '"';};
    var cleanRows = function(){ $('#myTable tbody').find("tr").remove();};
    var mapBlueprints = function(bprints){
        cleanRows();
        document.getElementById("authorNameShow").innerHTML = authorName + " Blueprints:";
        blueprints = bprints.map(function(blueprint){
            return {blueprintName: blueprint.name, totalPoints:blueprint.points.length};
        });
        blueprints.map(function(blueprint){
            let content = "<tr><td>" + blueprint.blueprintName +"</td><td>" + blueprint.totalPoints + "</td><td><input type='button' class='button' value='draw' onclick='Module.getBlueprintsByAuthorNameAndBlueprintName(" + str(authorName) +"," + str(blueprint.blueprintName) + ")'></td></tr>";
			$('#myTable tbody').append(content);
        });
        document.getElementById("totalPoints").innerHTML = "Total points: " + blueprints.reduce(function(total, blueprint){
                return total + blueprint.totalPoints;
        }, 0);
    };
    var drawBlueprint = function(bprint){
        document.getElementById("currentBlueprintName").innerHTML = "Current Blueprint: " + bprint.name;
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
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
    };
    return {
        updateAuthorName: function(newAuthorName){
            authorName = newAuthorName;
        },
        getBlueprintsByAuthorName: function(newAuthorName){
            api.getBlueprintsByAuthor(newAuthorName, mapBlueprints);
        },
        getBlueprintsByAuthorNameAndBlueprintName: function(newAuthorName, newBlueprintName){
            api.getBlueprintsByNameAndAuthor(newAuthorName, newBlueprintName, drawBlueprint);
        }
    };
})();
