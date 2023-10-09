Create or Alter Procedure [dbo].[createIngredient]
(@ingredientName varchar(20))
as

if exists (select IngredientsName from Ingredients where @ingredientName = IngredientsName)
begin
	print 'This ingredient already exists'
	return 1
end

Insert Into [Ingredients]
([IngredientsName])
Values (@ingredientName)
go

