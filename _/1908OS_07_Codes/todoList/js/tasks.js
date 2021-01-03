function error(err) {
    var listItem = $('<li>').html('Error: '+ err.message);
	$('#listTasks').append(listItem);
	$('#listTasks').listview('refresh');
}

function showErrorPopup(sMsg) {
	$('#dialogErrorText').text(sMsg);
	$('#contactError').popup('open');
}

function retrieveTasks() {
	try {
		tizen.calendar.getUnifiedCalendar("TASK").find(showTasks, error);
	} catch (err) {
		error(err);
	}
}

function deleteTask(taskId) {
	tizen.calendar.getUnifiedCalendar("TASK").remove(taskId);
}

function bindClick(item, taskId) {
	item.bind("click", function(event) {
		try {
			deleteTask(taskId);
			retrieveTasks();
		} catch(err) {
			showErrorPopup(err.message);
		}
	});
}

function showTasks(tasks) {
	$('#listTasks').empty();
	for (var nIter in tasks) {
		var taskDesc = $( '<h2>' ).html(tasks[nIter].description);
		var taskSummary = $( '<p>' ).html(tasks[nIter].summary);
		var listItem = $('<li>').append($( '<p>' ).append(taskDesc, taskSummary));
		bindClick(listItem, tasks[nIter].id);
		$('#listTasks').append(listItem);
	}
	$('#listTasks').listview('refresh');
}

function saveTask(sTitle, sSummary, taskDate) {
	var task = new tizen.CalendarTask({description: sTitle, 
									summary: sSummary,
									dueDate: taskDate });
	tizen.calendar.getUnifiedCalendar("TASK").add(task);
}

function clearForm() {
	$('#taskDesc').val('');
	$('#taskSummary').val('');
}

