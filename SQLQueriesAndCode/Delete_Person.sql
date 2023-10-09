CREATE OR ALTER PROCEDURE [dbo].[delete_Person]
(@username varchar(50))
AS

IF (@username IS NULL)
BEGIN
	RAISERROR('Please enter the username of the user to be deleted', 14, 1)
	RETURN 1
END

DECLARE @existingUsername varchar(50)

--check if username already exists
SELECT @existingUsername = Username
FROM Person p
Where p.Username = @username

--checks that the user exists
IF(@existingUsername is NULL)
BEGIN
	RAISERROR('Username does not exist', 14, 1)
	RETURN 1
END

--deletes from database
DELETE Person
WHERE (Person.Username = @username)

BEGIN
	PRINT 'Deleted ' + CONVERT(varchar(50), @username) + 'from Person'
	RETURN 0
END