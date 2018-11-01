/*! New York State Department of Taxation & Finance External Applications
 *  @description  Iflow External Applications
 *  @version      4.2.55.REL20180514
 *  @copyright    2018 New York State Department of Taxation & Finance
 */

var rstt={setCalendarCustomMinDate:function(idList,month,day,yearsAgo){try{var startDate,configs=[],ids=uiUtil.trim(idList,",").split(",");yearsAgo="number"==typeof yearsAgo?yearsAgo:120,startDate=(month=month||"01")+"/"+(day=day||"01")+"/"+((new Date).getFullYear()-yearsAgo),ids.forEach(function(id){configs.push({inputId:id,minDate:startDate})}),PLUGIN.calendar.customize({datePickers:configs})}catch(e){uiUtil.errorHandling.jsLog.addEntry(e,arguments)}}};