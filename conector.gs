/**
 * @fileoverview Conector de Jira para Data Studio para el analisis de Issues
 *
 */

var connector = connector || {};

/** @const */
connector.defaultPackage = 'googleapis';

/** @const dictionary diccionario para campos */
var fieldsDictionary = {
  'keys' : 'key',
  'summary': 'summary',
  'issuetype': 'issuetype',
  'creator': 'creator',
  'assignee': 'assignee',
  'reporter': 'reporter',
  'priority': 'priority',
  'status': 'status',
  'statusName': 'status',
  'created': 'created',
  'duedate': 'duedate',
  'resolutiondate': 'resolutiondate',
  'component': 'components',
  'label': 'labels',
  'epic': '',
  'project': 'project',
  'satisfaction': 'customfield_10204',
  'timespent': 'aggregatetimespent',
  'issues': '',
  'timeFirstResponse': 'customfield_10208',
  'breachedFirstResponse': 'customfield_10208',
  'timeResolution': 'customfield_10207',
  'breachedtimeResolution': 'customfield_10207',
  'changeSatartDate': 'customfield_10214',
  'changeCompletionDate': 'customfield_10215',
  'createdDayOfWeek': 'created',
  'createdHour': 'created',
  'resolutiondateDayOfWeek': 'resolutiondate',
  'resolutiondateHour': 'resolutiondate',
  'parent_key': 'parent',
  'parent_summary': 'parent',
  'parent_status': 'parent',
  'parent_status_name': 'parent',
  'parent_priority' : 'parent',
  'parent_issuetype': 'parent',
  'requestType':'customfield_10202'
}

/**
 * Devuelve el metodo de autenticacion requerido para autorizar Servicios de APIS
 * 
 *
 * @returns {Object} `AuthType` usado por el conector.
 */
function getAuthType() {
  return { type: 'NONE' };
}

/**
 * devuelve opciones configurables para el conector.
 *
 * @param {Object} request configuracion de peteciones de los parametros.
 * @returns {Object} Config que se muestra para el usuario o cliente .
 */
function getConfig() {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();

  config.newInfo()
    .setId('Auth')
    .setText('Credenciales para la API REST de Jira');

  config.newTextInput()
    .setId('User')
    .setName('Nombre de Usuario')
    .setPlaceholder('e.g. email@domain.com')
    .setHelpText('El usuario debe tener permiso para el proyecto');

  config.newTextInput()
    .setId('Token')
    .setName('API Token')
    .setHelpText('Token de la API que se necesita para Autenticar');

  config.newTextInput()
    .setId('Subdomain')
    .setName('Subdominio del servidor de Jira Cloud')
    .setHelpText('https:// + subdomain + .atlassian.net');

  config.newTextInput()
    .setId('JQL')
    .setName('nombre del proyecto en sintaxis JQL ')
    .setPlaceholder('project = NAME')
    .setHelpText('project = nombre del proyecto');

  config.newInfo()
    .setId('moreInfo')
    .setText('Para mas Info contactar con CTL')

  config.setDateRangeRequired(true);

  return config.build();
}

/**
 * Devuelve los campos para el conector.
 *
 * @returns {Object} Todos los campos del Conector Mapeados en Data Studio.
 */
function getFields() 
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;

  fields.newDimension()
    .setId('keys')
    .setName('Claves')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('summary')
    .setName('Resumen')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('issuetype')
    .setName('Tipo de Incidente')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('creator')
    .setName('Creador')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('assignee')
    .setName('Asignatario')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('reporter')
    .setName('Informador')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('priority')
    .setName('Prioridad')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('status')
    .setName('Estado')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('statusName')
    .setName('Nombre del estado')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('created')
    .setName('Fecha de Creacion')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('createdDayOfWeek')
    .setName('Creado (dia de la semana)')
    .setType(types.DAY_OF_WEEK);

  fields.newDimension()
    .setId('createdHour')
    .setName('Hora de creacion (hora)')
    .setType(types.HOUR);

  fields.newDimension()
    .setId('duedate')
    .setName('Due Date')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('resolutiondate')
    .setName('Resolution Date')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('resolutiondateDayOfWeek')
    .setName('Resolution Date (day of week)')
    .setType(types.DAY_OF_WEEK);

  fields.newDimension()
    .setId('resolutiondateHour')
    .setName('Resolution Date (hour)')
    .setType(types.HOUR);


  fields.newDimension()
    .setId('changeSatartDate')
    .setName('Change Start Date')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('changeCompletionDate')
    .setName('Change Completion Date')
    .setType(types.YEAR_MONTH_DAY);

  fields.newDimension()
    .setId('component')
    .setName('Componente')
    .setType(types.TEXT);

  fields.newDimension()
    .setId('label')
    .setName('Label')
    .setType(types.TEXT);

  // fields.newDimension()
  //   .setId('epic')
  //   .setName('Epic')
  //   .setType(types.TEXT);

  fields.newDimension()
    .setId('project')
    .setName('Proyecto')
    .setType(types.TEXT);

  fields.newMetric()
    .setId('satisfaction')
    .setName('Satisfaction')
    .setType(types.NUMBER);

  fields.newMetric()
    .setId('timespent')
    .setName('Time Spent (s)')
    .setType(types.DURATION);

  fields.newMetric()
    .setId('timeFirstResponse')
    .setName('Time to First Response (s)')
    .setType(types.DURATION);

  fields.newMetric()
    .setId('timeResolution')
    .setName('Time to Resolution (s)')
    .setType(types.DURATION);

  fields.newDimension()
    .setId('breachedFirstResponse')
    .setName('Breached First Response')
    .setType(types.BOOLEAN);

  fields.newDimension()
    .setId('breachedtimeResolution')
    .setName('Breached Time Resolution')
    .setType(types.BOOLEAN);

  fields.newMetric()
    .setId('issues')
    .setName('Issues')
    .setType(types.NUMBER);

  fields.newDimension()
    .setId('parent_key')
    .setName('Parent Key')
    .setType(types.TEXT)

  fields.newDimension()
    .setId('parent_summary')
    .setName('Parent Summary')
    .setType(types.TEXT)

  fields.newDimension()
    .setId('parent_status')
    .setName('Parent Status')
    .setType(types.TEXT)

  fields.newDimension()
    .setId('parent_status_name')
    .setName('Parent Status Name')
    .setType(types.TEXT)

  fields.newDimension()
    .setId('parent_priority')
    .setName('Parent Priority')
    .setType(types.TEXT)

  fields.newDimension()
    .setId('parent_issuetype')
    .setName('Parent Issue Type')
    .setType(types.TEXT)

  fields.newMetric()
    .setId('timespentUser')
    .setName('Time Spent (s) by worklogs')
    .setType(types.DURATION);

  fields.newDimension()
    .setId('requestType')
    .setName('Request Type')
    .setType(types.TEXT);

  return fields;
}

/**
 * Devuelve el esquema de la peticion
 *
 * @param {Object} request los parametros de la peticion del esquema.
 * @returns {Object} el esquema dada la peticion.
 */
function getSchema(request) {
  return { schema: getFields().build() };
}

/**
 * Devuelve el formato de Fecha segun el Script de Manifiesto
 *
 * @param {String} date Fecha en UTC
 * @param {String} format formato de fecha deseado
 * @returns {String} fecha en nuevo formato
 */
function formatTypeDate(data, format) {
  var result = Utilities.formatDate(new Date(data), Session.getScriptTimeZone(), format || "yyyyMMdd")
  return ( format == 'u' && result == '7' ) ? '0': result
}

/**
 *
 * arreglo de formato a una fila de datos hacia el formato requerido
 *
 * @param {Object} requestedFields Campos requeridos para la peticion de la funcion getData 
 * @param {Object} response Contiene la respuesta del Jira Cloud.
 * @returns {Array} valores de las filas dada la peticion de los campos en su formato predefinido
 */
function responseToRows(requestedFields, issues) {
  return issues.map(function(issue) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      switch (field.getId()) {
        case 'keys':
          row.push(issue.key || undefined);
          break;
        case 'summary':
          row.push(issue.fields.summary || undefined);
          break;
        case 'issuetype':
          row.push(issue.fields.issuetype? issue.fields.issuetype.name : undefined);
          break;
        case 'creator':
          row.push(issue.fields.creator? issue.fields.creator.displayName : undefined);
          break;
        case 'assignee':
          row.push(issue.fields.assignee? issue.fields.assignee.displayName : undefined);
          break;
        case 'reporter':
          row.push(issue.fields.reporter? issue.fields.reporter.displayName : undefined);
          break;
        case 'priority':
          row.push(issue.fields.priority? issue.fields.priority.name : undefined);
          break;
        case 'status':
          row.push(issue.fields.status? issue.fields.status.statusCategory.name : undefined);
          break;
        case 'statusName':
          row.push(issue.fields.status? issue.fields.status.name : undefined);
          break;
        case 'created':
          row.push(issue.fields.created? formatTypeDate(issue.fields.created) : undefined);
          break;
        case 'createdDayOfWeek':
          row.push(issue.fields.created? formatTypeDate(issue.fields.created, 'u') : undefined);
          break;
        case 'createdHour':
          row.push(issue.fields.created? formatTypeDate(issue.fields.created, 'HH') : undefined);
          break;
        case 'duedate':
          row.push(issue.fields.duedate? formatTypeDate(issue.fields.duedate) : undefined);
          break;
        case 'resolutiondate':
          row.push(issue.fields.resolutiondate? formatTypeDate(issue.fields.resolutiondate) : undefined);
          break;
        case 'resolutiondateDayOfWeek':
          row.push(issue.fields.resolutiondate? formatTypeDate(issue.fields.resolutiondate, 'u') : undefined);
          break;
        case 'resolutiondateHour':
          row.push(issue.fields.resolutiondate? formatTypeDate(issue.fields.resolutiondate, 'HH') : undefined);
          break;
        case 'component':
          row.push(issue.fields.components[0]? issue.fields.components[0].name: '');
          break;
        case 'label':
          row.push(issue.fields.labels? issue.fields.labels.join(): '');
          break;
        // case 'epic':
        //   row.push(issue.fields.labels[0]? issue.fields.labels[0]: '');
        //   break;
        case 'project':
          row.push(issue.fields.project? issue.fields.project.name : undefined);
          break;
        case 'satisfaction':
          row.push(issue.fields.customfield_10204? issue.fields.customfield_10204.rating : undefined);
          break;
        case 'timespent':
          row.push(issue.fields.aggregatetimespent? issue.fields.aggregatetimespent + '': undefined);
          break;
        case 'issues':
          row.push(1);
          break;
        case 'timeFirstResponse':
          row.push(issue.fields.customfield_10208? issue.fields.customfield_10208.completedCycles? issue.fields.customfield_10208.completedCycles[0]?  (Math.round(issue.fields.customfield_10208.completedCycles[0].elapsedTime.millis/1000)) +'': undefined: undefined : undefined );
          break;
        case 'breachedFirstResponse':
          row.push(issue.fields.customfield_10208? issue.fields.customfield_10208.completedCycles? issue.fields.customfield_10208.completedCycles[0]?  issue.fields.customfield_10208.completedCycles[0].breached: undefined: undefined: undefined );
          break;
        case 'timeResolution':
          row.push(issue.fields.customfield_10207? issue.fields.customfield_10207.completedCycles? issue.fields.customfield_10207.completedCycles[0]?  (Math.round(issue.fields.customfield_10207.completedCycles[0].elapsedTime.millis/1000)) +'' : undefined: undefined :undefined);
          break;
        case 'changeSatartDate':
          row.push(issue.fields.customfield_10214? formatTypeDate(issue.fields.customfield_10214): undefined);
          break;
        case 'changeCompletionDate':
          row.push(issue.fields.customfield_10215? formatTypeDate(issue.fields.customfield_10215): undefined);
          break;
        case 'breachedtimeResolution':
          row.push(issue.fields.customfield_10207? issue.fields.customfield_10207.completedCycles? issue.fields.customfield_10207.completedCycles[0]?  issue.fields.customfield_10207.completedCycles[0].breached: undefined: undefined: undefined );
          break;
        case 'parent_key':
          row.push(issue.fields.parent? issue.fields.parent.key? issue.fields.parent.key : undefined : undefined);
          break;
        case 'parent_summary':
          row.push(issue.fields.parent? issue.fields.parent.fields? issue.fields.parent.fields.summary? issue.fields.parent.fields.summary : undefined: undefined: undefined );
          break;
        case 'parent_status':
          row.push(issue.fields.parent? issue.fields.parent.fields? issue.fields.parent.fields.status? issue.fields.parent.fields.status.statusCategory? issue.fields.parent.fields.status.statusCategory.name : undefined : undefined: undefined: undefined );
          break;
        case 'parent_status_name':
          row.push(issue.fields.parent? issue.fields.parent.fields? issue.fields.parent.fields.status? issue.fields.parent.fields.status.name : undefined: undefined: undefined );
          break;
        case 'parent_priority':
          row.push(issue.fields.parent? issue.fields.parent.fields? issue.fields.parent.fields.priority? issue.fields.parent.fields.priority.name : undefined: undefined: undefined );
          break;
        case 'parent_issuetype':
          row.push(issue.fields.parent? issue.fields.parent.fields? issue.fields.parent.fields.issuetype? issue.fields.parent.fields.issuetype.name : undefined: undefined: undefined );
          break;
        case 'timespentUser':
          row.push(issue.timeSpentSeconds? issue.timeSpentSeconds + '': undefined);
          break;
        case 'requestType':
          row.push(issue.fields.customfield_10202? issue.fields.customfield_10202.requestType? issue.fields.customfield_10202.requestType.name : undefined : undefined )
          break;
        default:
          row.push('');
      }
    });
    return { values: row };
  });
}

/**
 * itera para evadir el limite de querys
 *
 * @param {Array} fieldsToRequest array de campos para consultas
 * @param {Object} configParams config de parametros de peticiones
 * @param {Number} startIssues creacion de issues a consultar
 * @param {Array} accumulated
 * @returns {Array} issues acumuladas en la query
 */
function getFullIssuesByAPI(fieldsToRequest, request, startIssues, accumulated){
  var maxResults = 100;
  var data = {
    'jql': request.configParams.JQL,
    'maxResults': maxResults,
    'startAt': startIssues,
    'fields': fieldsToRequest
  };
  var auth = Utilities.base64Encode(request.configParams.User + ':' + request.configParams.Token);
  var opts = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + auth,
      'cache-control': 'no-cache'
    },
    'payload': JSON.stringify(data),
    'muteHttpExceptions': true
  };
  var url = 'https://' + request.configParams.Subdomain + '.atlassian.net/rest/api/2/search';

  try {
    var response = UrlFetchApp.fetch(url, opts);
    var parsedResponse = JSON.parse(response);
    accumulated = accumulated.concat(parsedResponse.issues);
    if (parsedResponse.total - (startIssues + maxResults) > 0 ){
      return getFullIssuesByAPI(fieldsToRequest, request, startIssues + maxResults, accumulated );
    } else {
      return accumulated;
    }
  } catch (e) {
    connector.throwError(e, true);
  }
}

/**
 * Devuelve la data en conjunto con la peticion 
 *
 * @param {Object} request parametros de peticion de los datos.
 * @returns {Object} Contiene el esquema y los datos dado la respectiva peticion.
 */
function getData(request) {
  var requestedFieldIds = request.fields.map(function(field) {
    return field.name;
  });
  var requestedFields = getFields().forIds(requestedFieldIds);
  var fieldsToRequest = request.configParams.worklogs? ['worklog'] : []
  requestedFields.asArray().forEach(function (field) {
    if ( fieldsToRequest.indexOf( fieldsDictionary[field.getId()] == -1 ) ) {
      fieldsToRequest.push(fieldsDictionary[field.getId()])
    }
  })

  try {
    var responseFullIssues = getFullIssuesByAPI(fieldsToRequest, request, 0, []);
  } catch (e) {
    connector.throwError(e, true);
  }


  try{
    var rows = responseToRows(requestedFields, responseFullIssues);
  } catch (e) {
    connector.throwError(e, true);
  }

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}

function isAdminUser() {
  return true;
}

connector.throwError = function(message, userSafe) {
  console.log(message)
  if (userSafe) {
    message = 'DS_USER:' + message;
  }
  throw new Error(message);
};