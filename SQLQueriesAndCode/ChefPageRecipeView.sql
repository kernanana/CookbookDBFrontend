--Not finished

USE CSSE333_S2G2_FinalProjectDB
GO

CREATE VIEW dbo.SingleRecipe AS
SELECT r.Recipe_Name, r.Image, r.Rating
FROM Recipe r
WHERE r.ID = 