var counter = 0;
var saved_html = document.getElementById("rendered_html").value;

// for rendering final draft
var html_demo = document.getElementById("html_demo");
var closer_data = document.getElementById("closer_data");

var rendered_html = document.getElementById("rendered_html");

function startover (){ 
	counter = 0;
	var node_tree = document.getElementById("email_properties");                       
	html_demo.innerHTML = "";
	node_tree.innerHTML = "";
	rendered_html.value = saved_html;
}
function addItem (email_property){

	//counter is for testing purposes
	var prop = toSnakeCase(email_property);
	var text_area_data = document.getElementById(prop + "_data").value;
	var wrapper = document.createElement("tr"); 

	counter++;
	wrapper.innerHTML = text_area_data;    
	//wrapper.appendChild(wrapper.innerHTML);
	wrapper.className = "emailnode_" + counter.toString();                             
	html_demo.appendChild(wrapper);

	// adds items to the layout tree
	createLayoutTreeItem(email_property);
}

function createLayoutTreeItem (email_property){
	var list_item = document.createElement("li");
	var list_text_node = document.createTextNode(email_property + " "+ counter + " ");
	var delete_node = createDeleteButton(counter);

	email_property = toSnakeCase(email_property);

	list_item.className = email_property + " emailtree_" + counter.toString();
	list_item.appendChild(list_text_node);
	list_item.appendChild(delete_node);
	document.getElementById("email_properties").appendChild(list_item);
}
function toSnakeCase(email_property){
	while(email_property.indexOf(" ") != -1){
		email_property = email_property.replace(" ","_");
	}
	return email_property.toLowerCase();
}
function createDeleteButton (counter){
	var delete_node = document.createElement("button");
	var delete_text_node = document.createElement("span");
	delete_text_node.className = "ui-icon ui-icon-trash";
	delete_node.appendChild(delete_text_node);
	delete_node.className = "delete_button"
	delete_node.addEventListener("click", function(){
	    deleteTreeItem(this);
	    deleteDemoItem(counter);
	});	
	return delete_node;
}
function deleteTreeItem (node){
	node.parentNode.parentNode.removeChild(node.parentNode);
}
function deleteDemoItem (node_index){
	if(!isNaN(node_index)){
		var email_node = document.querySelectorAll('.emailnode_'+node_index);
		if(email_node.length !== 0){
			email_node[0].parentNode.removeChild(email_node[0]);
		}else{
			console.log("Does not exist");
		}
	}
}
function printHtml (){
	var content = html_demo.innerHTML;
	var footer = closer_data.value;

	//first clear contents
	rendered_html.value = saved_html;
	rendered_html.value += content;
	rendered_html.value += footer;
	rendered_html.style.display = "block";
}