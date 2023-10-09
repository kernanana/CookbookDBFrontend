create procedure dbo.deleteIngredient
(@ingredientName varchar(20))
as

if not exists (select IngredientsName from Ingredients where @ingredientName = IngredientsName)
begin
	print 'This ingredient does not exist'
	return 1
end

delete Ingredients
where (IngredientsName = @ingredientName)
Go
