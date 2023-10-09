SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[Update_Recipe]
(@RecipeID_1 [int],
@SkillLevel_2 [int] = NULL,
@Instructions_3 [text] = NULL,
@MealType_4 [nvarchar] = NULL,
@PrepTime_5 [time] = NULL,
@chefUser_6 [varchar])
AS
IF NOT EXISTS (SELECT ID FROM [Recipe] c WHERE ID = @RecipeID_1)

	BEGIN 
	RAISERROR('No Recipe with this ID exists!', 14, 1); 
		RETURN 1;
	END
IF NOT EXISTS(SELECT ChefUser FROM [RECIPE] r WHERE ChefUser = @chefUser_6 )

	BEGIN 
	RAISERROR('Chef''s must stay consistent.', 14, 1); 
		RETURN 1;
	END

IF(@SkillLevel_2 is NULL )

	BEGIN

		SELECT @SkillLevel_2 = [SkillLevel]
		FROM  [Recipe]  
		WHERE ( ID = @RecipeID_1)	
	END
IF(@Instructions_3 is NULL )

	BEGIN

		SELECT @Instructions_3 = [Instructions]
		FROM  [Recipe]  
		WHERE ( ID = @RecipeID_1)	
	END
IF(@MealType_4 is NULL )

	BEGIN

		SELECT @MealType_4 = [MealType]
		FROM  [Recipe]  
		WHERE ( ID = @RecipeID_1)	
	END
IF(@PrepTime_5 is NULL )

	BEGIN

		SELECT @PrepTime_5 = [PrepTime]
		FROM  [Recipe]  
		WHERE ( ID = @RecipeID_1)	
	END


UPDATE [Recipe]
SET [SkillLevel] = @SkillLevel_2, [Instructions] = @Instructions_3, 
[MealType] = @MealType_4, [PrepTime] = @PrepTime_5
WHERE ( [ID] = @RecipeID_1 AND [ChefUser] = @chefUser_6)

go

EXEC [dbo].[Update_Recipe] @RecipeID_1 = 12334, @SkillLevel_2 = 2, @Instructions_3 = 'Random', @MealType_4 = 'Vegan', @chefUser_6 = 'rosatti'