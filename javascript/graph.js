$(document).ready(function() {
    canvas = $('#graph')[0];
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    
    var graph = new Springy.Graph();
    var springy = window.springy = $('#graph').springy({
        graph : graph,
        nodeSelected : function(node) {
            console.log('Node selected: ' + JSON.stringify(node.data));
        }
    });
    
    $('#addnode').click(function() {
        //var name = prompt("enter node id", "node");
        var name = "name";
        for (var i=0; i<100; i++) {
            graph.newNode({label: name + i});
        };
    });
    
    $('#addedge').click(function() {
        var first = springy.getSelected();
        var second = springy.getPrevious();
        
        if (first === null || second === null) {
            alert("please select 2 nodes");
            return;
        }
        
        graph.newEdge(first.node, second.node);
    });
    
    $('#removenode').click(function() {
        var node = springy.getSelected();
        
        if (node === null) {
            alert("please select a node");
            return;
        }
        
        graph.removeNode(node.node);
    });
    
    $('#removeedge').click(function() {
        var first = springy.getSelected();
        var second = springy.getPrevious();
        
        if (first === null || second === null) {
            alert("please select 2 nodes");
            return;
        }
        
        for (edge in graph.getEdges(first.node, second.node)) {
            console.log(edge.edge);
            graph.removeEdge(edge);
        };
    });
});