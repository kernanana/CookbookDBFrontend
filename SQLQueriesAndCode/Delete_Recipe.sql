SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Alter PROCEDURE [dbo].[delete_Recipe] --ALTER
(@RecipeID_1 [int])
AS

IF (@RecipeID_1 is null OR NOT EXISTS (SELECT * FROM [Recipe] WHERE [ID] = @RecipeID_1)) -- This Procedure checks if the ORDERID_1 is valid and not null
	BEGIN
		RAISERROR('Given RecipeID_1 does not correspond to an existing recipe!.', 14, 1); 
		RETURN 1;
	END;

DELETE [Recipe]
WHERE ( [ID] = @RecipeID_1 )
RETURN 0;

--EXEC [dbo].[delete_Recipe] @RecipeID_1 = 12334 Testing Deleting
