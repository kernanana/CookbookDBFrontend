CREATE OR ALTER PROCEDURE [dbo].[insert_Chef]
(@username varchar(50))
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

IF(@existingUsername is not NULL)
BEGIN
	RAISERROR('This chef already exists', 14, 1)
	RETURN 1
END

--check if Person with same username exists
DECLARE @personUsername varchar(50)
SELECT @personUsername = p.Username
FROM Person p
Where p.Username = @username

IF(@personUsername is NULL)
BEGIN
	RAISERROR('This user can not become a chef because they do not exist', 14, 1)
	RETURN 1
END

--check if there is Person with this username is not already a chef
DECLARE @notAChefYet varchar(50)
SELECT @notAChefYet = p.Username
FROM Person p
JOIN Chef c on p.Username = c.Username
Where p.Username = @username

IF(@notAChefYet is not NULL)
BEGIN
	RAISERROR('This person is already registered as another chef', 14, 1)
	RETURN 1
END

INSERT INTO Chef
(Username)
VALUES ( @username)

BEGIN
	PRINT 'Inserted new chef ' + CONVERT(varchar(50), @username)
	RETURN 0
END