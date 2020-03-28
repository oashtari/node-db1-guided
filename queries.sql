-- record and row are same thing

-- READ data
SELECT *
FROM Products
-- Products is a table name.
-- * is all columns, can enter specific names
-- WHERE is 

SELECT Country, City, SupplierName
FROM Suppliers
WHERE Country = 'USA'

-- added OR
SELECT *
FROM Customers
WHERE Country = 'USA' OR City = 'Paris'

-- added ORDER BY 
SELECT Country, City, CustomerName, ContactName
FROM Customers
WHERE Country = 'USA' OR City = 'Paris'
ORDER BY Country DESC

-- added comma for secondary ORDER BY
SELECT Country, City, CustomerName, ContactName
FROM Customers
WHERE Country = 'USA' OR City = 'Paris'
ORDER BY Country, City DESC

-- added LIMIT 
-- [] give you the value literally, in case there are redundancies in the names
SELECT *
FROM [Products]
WHERE Price > 25
ORDER BY Price DESC
LIMIT 5

-- CREATE/ADD data
-- first () is to identify what column values you're adding in
-- second () the values of those columns
INSERT INTO [Shippers]
(ShipperName, Phone)
VALUES
('Lambda', '555-555-1234')

-- UPDATE data
-- ALWAYS need WHERE when doing an update
UPDATE [Shippers]
SET Phone = '555-555-4321'
WHERE ShipperName='Lambda'

-- to be safe, run SELECT first to make sure you're looking at correct data

--SELECT * FROM [Shippers]

UPDATE Shippers SET Phone = '555-555-0987'
WHERE ShipperID = 4;

-- DELETE data

DELETE FROM Shippers
WHERE ShipperID = 4; 
