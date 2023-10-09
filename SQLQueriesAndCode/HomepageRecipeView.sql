USE CSSE333_S2G2_FinalProjectDB
GO

CREATE VIEW dbo.HomepageRecipe AS
SELECT r.Recipe_Name, r.Image, r.Rating
FROM Recipe r
