create procedure dbo.deleteNeed
(@toolName varchar(20),
@recipeID int)
as

if not exists (select ToolName from Tools where @toolName = ToolName)
begin
	print 'This tool does not exist'
	return 1
end

if not exists (select ID from Recipe where @recipeID = ID)
begin
	print 'This recipe does not exist'
	return 1
end

delete Needs
where (@toolName = ToolName and @recipeID = RecipeID)
go