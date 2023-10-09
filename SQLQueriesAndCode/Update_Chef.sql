CREATE OR ALTER PROCEDURE [dbo].[update_Chef]
(@username varchar(50),
--everything that isnt username is optional
@profilePic image,
@stars int,
@bio varchar(300))

AS

--check if username field is null
IF (@username IS NULL)
BEGIN
	RAISERROR('Please enter a value for username', 14, 1)
	RETURN 1
END

--check if username already exists
DECLARE @existingUsername varchar(50)
SELECT @existingUsername = Username
FROM Chef c
Where c.Username = @username

IF(@existingUsername is NULL)
BEGIN
	RAISERROR('This chef does not exist', 14, 1)
	RETURN 1
END

UPDATE Chef
SET Biography = @bio, Rating = @stars, ProfilePic = @profilePic
WHERE Username = @username

BEGIN
	PRINT 'Inserted new chef ' + CONVERT(varchar(50), @username)
	RETURN 0
END