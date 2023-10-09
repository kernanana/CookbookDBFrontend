CREATE OR ALTER PROCEDURE [dbo].[delete_Chef]
(@username varchar(50))
AS

--check if username field is null
IF (@username IS NULL)
BEGIN
	RAISERROR('Please enter a value for both username and password', 14, 1)
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

BEGIN
	DELETE Chef
	WHERE Chef.Username = @username
END

BEGIN
	PRINT 'Deleted chef ' + CONVERT(varchar(50), @username)
	RETURN 0
END