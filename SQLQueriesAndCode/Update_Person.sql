CREATE OR ALTER PROCEDURE [dbo].[update_Person]
(@oldusername varchar(50),
@username varchar(50),
@password varchar(50))
AS

--check if the old username is an input
IF (@oldusername is NULL)
BEGIN
	RAISERROR('Please enter the username for the user you would like to update', 14, 1)
	RETURN 1
END

--check if new username already exists
DECLARE @existingUsername varchar(50)

SELECT @existingUsername = Username
FROM Person p
Where p.Username = @username

IF(@existingUsername is not NULL)
BEGIN
	RAISERROR('Username already exists', 14, 1)
	RETURN 1
END

--updates to new username
IF(@username is not NULL)
BEGIN
	UPDATE [Person]
	SET Username = @username
	WHERE Person.Username = @oldusername
END

--updates to new password
IF(@password is not NULL)
BEGIN
	UPDATE [Person]
	SET Password = @password
	WHERE Person.Username = @oldusername
END

BEGIN
	PRINT 'Updated old user ' + CONVERT(varchar(50), @oldusername) + 'to new user ' + CONVERT(varchar(50), @username) + ' with password ' + CONVERT(varchar(50), @password)
	RETURN 0
END