create procedure createNeed
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

insert into Needs
(ToolName, RecipeID)
values (@toolName, @recipeID)
go