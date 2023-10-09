create or alter procedure dbo.createTool
(@toolName varchar(20))
as

if exists (select ToolName from Tools where @toolName = ToolName)
begin
	print 'This tool already exists'
	return 1
end

Insert Into Tools
(ToolName)
Values (@toolName)
go

