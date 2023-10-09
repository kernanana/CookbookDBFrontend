CREATE OR ALTER PROCEDURE [dbo].[insert_Person]
(@username varchar(50),
@password varchar(50))
AS

--check if password and username are inputs
IF (@username IS NULL OR @password IS NULL)
BEGIN
	RAISERROR('Please enter a value for both username and password', 14, 1)
	RETURN 1
END

DECLARE @existingUsername varchar(50)

--check if username already exists
SELECT @existingUsername = Username
FROM Person p
Where p.Username = @username

IF(@existingUsername is not NULL)
BEGIN
	RAISERROR('Username already exists', 14, 1)
	RETURN 1
END

--inserts into the database
INSERT INTO Person
(Username, Password)
VALUES ( @username, @password)

BEGIN
	PRINT 'Inserted new user ' + CONVERT(varchar(50), @username) + ' with password ' + CONVERT(varchar(50), @password)
	RETURN 0
END