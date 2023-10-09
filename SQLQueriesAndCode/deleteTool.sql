create or alter procedure dbo.deleteTool
(@toolName varchar(20))
as

if not exists (select ToolName from Tools where @toolName = ToolName)
begin
	print 'This tool does not exists'
	return 1
end

delete Tools
where (@toolName = ToolName)
go