myApp.factory('factory', ['$http', function($http){
  console.log('in factory');

  var idToken = sessionStorage.getItem('userAuth');
  var isAdmin = true;

  var getAllEmployees = function () {
    //gets all non admin employees
    console.log('got to getAllEmployees');
    return $http({
    method: 'GET',
    url: 'api/users',
    headers: {
      id_token: idToken}
    });//end http
  };//end getAllEmployees

  //check if a user already exists
  var checkUserDB = function (id, name, photo) {
    console.log('got into checkUserDB');
    return $http({
      method: 'GET',
      url: '/dbcheck/?clientUID=' + id + '&' + name + '&' + photo,
      headers:{
        id_token: idToken}
    });//end htto
  };//end checkUserDB

  var getActiveEmp = function(){
    //get only active employees including admins
    return $http({
      method: 'GET',
      url:'api/users/active',
      headers:{
        id_token: idToken}
    });//end http
  };

  var getInActiveEmp = function(){
      //get inactive employees
      return $http({
        method:'GET',
        url:'api/users/inactive',
        headers:{
          id_token: idToken}
      });//end http
  };//end get inactive employees

  var changeIsAdmin = function (objectToSend) {
    console.log(objectToSend,'object to send');
      //route to is user active / is user admin
    return $http({
      method:'PUT',
      url:'/api/users',
      data: objectToSend,
      headers :{
        id_token: idToken}
      });//end http
    };//end changeIsAdmin

  var adminStatus = function(authid){
      return $http({
        method:'GET',
        url: 'api//users/admin/?authid=' + empid,
        headers:{
          id_token: idToken}
      });
  };



  var getMyProjects = function (empid) {
    console.log('into factory getMyProjects');
      if(isAdmin){
        return $http({
          method: 'GET',
          url: 'api/projects/?empid=' + empid,
          headers: {
            id_token: idToken}
        });
      }
  };

  //get time based on employees id and project id
  var getTime = function(empid, projid){
    return $http({
      method:'GET',
      url: 'api/timebyprojemp/?empid=' + empid + '&projid=' + projid,
      headers: {
        id_token: idToken
      }
    });
  };//end getTime by empid projectid


  var getAllMyTime = function (project) {
    console.log('made it to getAllMyTime');
    return $http({
      method: "GET",
      url: 'api/time',
      headers: {
        id_token: idToken}
    });
  };

  var addTime = function (objectToSend) {

    return $http({
      method: 'POST',
      url: 'api/time',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };
  var editTime = function (type, value,id) {
    console.log('made it to edit time factory');
    var objectToSend = {
      timeid:id,
      type: type,
      value: value
    };//objectToSend

    return $http({
      method: 'PUT',
      url: 'api/time',
      data:objectToSend,
      headers: {
        id_token: idToken}
    });//http call
  };//edit time function

  //get all users for a specific project
  var getProjectUsers = function (projectId) {
    console.log('made it to getProjectUsers');

    return $http({
      method: 'GET',
      url: 'api/users/byProject/?projectId=' + projectId,
      headers: {
        id_token: idToken}
    });
  };//end getProjectUsers function

  var editProject = function (type, value, projId) {
    console.log('made it to editProject with', type, value, projId);
    var objectToSend = {
      type: type,
      value: value,
      projectid: projId
    };

    return $http({
      method: 'PUT',
      url: 'api/projects',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var addProject = function (name, start, end, client, active) {
    console.log('made it to addProject', name, start, end, client);
    var objectToSend = {
      projectname: name,
      startdate: start,
      enddate: end,
      client_id: client,
      isactive: active
    };
    return $http({
      method: 'POST',
      url: 'api/projects',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var deleteTimeEntry = function (timeId) {
    console.log('made it to deleteTimeEntry in factory');

    return $http({
      method: 'DELETE',
      url: '/api/time',
      data: {timeid: timeId},
      headers: {id_token: idToken,
        "Content-Type": "application/json;charset=utf-8"}
    });
  };

  var addEmpToProject = function (empId, projId) {
    console.log('made it to addEmpToProject');
    var objectToSend = {
      empid: empID,
      projectid: projId,
    };
    return $http({
      method: 'POST',
      url: 'api/projects/users',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var getMyTimeForThisProject = function (empId, projId) {
    console.log('made it to getMyTimeForThisProject', empId, projId);
    var objectToSend = {
      empid: empID,
      projectid: projId,
    };
    return $http({
      method: 'POST',
      url: 'api/projects/users',
      data: objectToSend,
      headers: {
        id_token: idToken}
    });
  };

  var getAllClients = function(){
    //get all clients
    console.log('Getting All Clients');
    return $http({
      method:'GET',
      url:'api/clients',
      headers: {
        id_token: idToken}
    });
  };//end get all clients

  var getClientProjects = function(clientid){
    //get client projects based on clien_ids
    return $http({
      method: 'GET',
      url: 'api/projects/?clientUID=' + clientid,
      headers: {
        id_token: idToken
      }
    });//end http
  };//end get client projects

  return {
    getAllEmployees: getAllEmployees,
    checkUserDB: checkUserDB,
    isAdmin: function () {
      return isAdmin;
    },
    changeIsAdmin: changeIsAdmin,
    getClientProjects: getClientProjects,
    getActiveEmp: getActiveEmp,
    getInActiveEmp: getInActiveEmp,
    getMyProjects: getMyProjects,
    getAllMyTime: getAllMyTime,
    addTime: addTime,
    getAllClients : getAllClients,
    getProjectUsers: getProjectUsers,
    editProject: editProject,
    addProject: addProject,
    editTime:editTime,
    deleteTimeEntry: deleteTimeEntry,
    addEmpToProject: addEmpToProject,
    getTime:getTime,
    getMyTimeForThisProject: getMyTimeForThisProject
  };

}]);
