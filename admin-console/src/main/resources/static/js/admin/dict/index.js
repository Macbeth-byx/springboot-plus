layui.define([ 'form', 'laydate', 'table' ], function(exports) {
	var form = layui.form;
	var laydate = layui.laydate;
	var table = layui.table;
	var dictTable = null;
	var view ={
		
		init:function(){
			this.initTable();
			this.initSearchForm();
			this.initToolBar();
			window.dataReload = function(){
				Lib.doSearchForm($("#searchForm"),dictTable,form)
			}
			
			
		},
		initTable:function(){
			dictTable = table.render({
				elem : '#dictTable',
				height : Lib.getTableHeight(1),
				method : 'post',
				url : Common.CTX + '/admin/dict/list.json' //数据接口
				,page : Lib.tablePage //开启分页
				,limit : 10,
				cols : [ [ //表头
				{
					type : 'checkbox',
					fixed:'left',
				}, 
				{
					field : 'value',
					title : '字典值',
					
					fixed:'left',
					width : 120,
				}, 
				{
					field : 'name',
					title : '字典名称',
					width : 180,
				}, 
				{
					field : 'type',
					title : '字典类型',
					width : 180,
				}, 
				{
					field : 'typeName',
					title : '字典类型名称',
					
					width : 180,
				}, 
				{
					field : 'sort',
					title : '排序',
					width : 60,
				}, 
				{
					field : 'parent',
					title : '父字典',
					width : 100,
				}, 
				
				{
					field : 'remark',
					title : '备注',
					
					width : 100,
				}, 
				{
					field : 'createTime',
					title : '创建时间',
					
					width : 100,
				} 

				] ]

			});
		},
		
		initSearchForm:function(){
			Lib.initSearchForm( $("#searchForm"),dictTable,form);
		},
		initToolBar:function(){
			toolbar = {
					add : function() { //获取选中数据
						var url = "/admin/dict/add.do";
						Common.openDlg(url,"字典数据管理>新增");
					},
					edit : function() { //获取选中数目
						var data = Common.getOneFromTable(table,"dictTable");
						if(data==null){
							return ;
						}
						var url = "/admin/dict/edit.do?id="+data.value;
						Common.openDlg(url,"字典数据管理>"+data.value+">编辑");
						
					},
					del : function() { 
						layui.use(['del'], function(){
							  var delView = layui.del
							  delView.delBatch();
						});
					}
					
					
				};
			$('.ext-toolbar').on('click', function() {
				var type = $(this).data('type');
				toolbar[type] ? toolbar[type].call(this) : '';
			});
		}
	}

	 exports('index',view);
	
});