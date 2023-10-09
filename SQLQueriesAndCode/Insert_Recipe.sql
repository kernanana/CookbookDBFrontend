SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[insert_Recipe]
(@RecipeID_1 [int],
@SkillLevel_2 [int],
@Instructions_3 [text],
@MealType_4 [nvarchar],
@PrepTime_5 [time],
@chefUser_6 [varchar])
AS
IF EXISTS (SELECT ID FROM [Recipe] c WHERE ID = @RecipeID_1)

	BEGIN 
	RAISERROR('ID already exists!', 14, 1); 
		RETURN 1;
	END

IF NOT EXISTS (SELECT Username FROM [Chef] c WHERE Username = @chefUser_6)

	BEGIN 
	RAISERROR('No Chef of that username exists!.', 14, 1); 
		RETURN 1;
	END

IF(@Instructions_3 is NULL )

	BEGIN
	RAISERROR('Need instructions to input a recipe!.', 14, 1);

		RETURN 1;
	END

IF(@MealType_4 IS NULL) -- Checks if null input and sets to default for unitprice
	BEGIN
	SELECT @MealType_4 = 'None';
	END

IF(@SkillLevel_2 IS NULL)
	BEGIN
	SELECT @SkillLevel_2 = 1;
	END

IF(@PrepTime_5 IS NULL)
	BEGIN
	SELECT @PrepTime_5 = 'Unknown';
	END


INSERT INTO [Recipe]
([ID], [SkillLevel], [Instructions], [MealType], [PrepTime], [ChefUser])
VALUES ( @RecipeID_1, @SkillLevel_2, @Instructions_3, @MealType_4, @PrepTime_5, @chefUser_6)

RETURN 0;

--EXEC [dbo].[insert_Recipe] @SkillLevel_1= 3, @Instructions_2='Here are instructions', @MealType_3 = 'Vegan', @PrepTime_4 = '10:05', @chefUser_5 = 'weirdo' --Testing Insert Where no chef exists. Status: Successful!
