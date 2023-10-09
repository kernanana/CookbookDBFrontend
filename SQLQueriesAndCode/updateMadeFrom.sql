create or alter procedure dbo.updateMadeFrom
(@recipeID int,
@ingredientName varchar(20),
@units nvarchar(20))
as

if not exists (select IngredientsName from Ingredients where @ingredientName = IngredientsName)
begin
	print 'This ingredient does not exist'
	return 1
end

if not exists (select ID from Recipe where @recipeID = ID)
begin
	print 'This recipe does not exist'
	return 2
end

update MadeFrom
set units = @units
where (@recipeID = RecipeID and @ingredientName = IngredientName)
go