USE library_db;

ALTER TABLE book ADD COLUMN category VARCHAR(255) DEFAULT 'General';

-- 2. Categorize Computer Science & IT
UPDATE book SET category = 'Computer Science & IT' 
WHERE LOWER(title) LIKE '%clean code%'
   OR LOWER(title) LIKE '%pragmatic%'
   OR LOWER(title) LIKE '%algorithm%'
   OR LOWER(title) LIKE '%design pattern%'
   OR LOWER(title) LIKE '%structure and interpretation%'
   OR LOWER(title) LIKE '%artificial intelligence%'
   OR LOWER(title) LIKE '%python%'
   OR LOWER(title) LIKE '%java%'
   OR LOWER(title) LIKE '%you don''t know js%'
   OR LOWER(title) LIKE '%cracking the coding%'
   OR LOWER(title) LIKE '%database system%'
   OR LOWER(title) LIKE '%computer networking%'
   OR LOWER(title) LIKE '%operating system%'
   OR LOWER(title) LIKE '%grokking%'
   OR LOWER(title) LIKE '%c programming%'
   OR LOWER(title) LIKE '%clean architecture%'
   OR LOWER(title) LIKE '%refactoring%'
   OR LOWER(title) LIKE '%domain-driven%'
   OR LOWER(title) LIKE '%data-intensive%'
   OR LOWER(title) LIKE '%site reliability%'
   OR LOWER(title) LIKE '%continuous delivery%'
   OR LOWER(title) LIKE '%phoenix project%'
   OR LOWER(title) LIKE '%software engineering%'
   OR LOWER(title) LIKE '%accelerate%'
   OR LOWER(title) LIKE '%data structures%'
   OR LOWER(title) LIKE '%vibe code%';

-- 3. Categorize Mathematics
UPDATE book SET category = 'Mathematics'
WHERE LOWER(title) LIKE '%math%'
   OR LOWER(title) LIKE '%calculus%'
   OR LOWER(title) LIKE '%algebra%'
   OR LOWER(title) LIKE '%probability%'
   OR LOWER(title) LIKE '%sequences and progressions%'
   OR LOWER(title) LIKE '%joy of x%';

-- 4. Categorize Science & Nature
UPDATE book SET category = 'Science & Nature'
WHERE LOWER(title) LIKE '%brief history of time%'
   OR LOWER(title) LIKE '%cosmos%'
   OR LOWER(title) LIKE '%selfish gene%'
   OR LOWER(title) LIKE '%astrophysics%'
   OR LOWER(title) LIKE '%the gene%';

-- 5. Categorize Literature & Fiction
UPDATE book SET category = 'Literature & Fiction'
WHERE LOWER(title) LIKE '%mockingbird%'
   OR LOWER(title) LIKE '%1984%'
   OR LOWER(title) LIKE '%great gatsby%'
   OR LOWER(title) LIKE '%pride and prejudice%'
   OR LOWER(title) LIKE '%hobbit%'
   OR LOWER(title) LIKE '%lord of the rings%'
   OR LOWER(title) LIKE '%harry potter%'
   OR LOWER(title) LIKE '%catcher in the rye%'
   OR LOWER(title) LIKE '%brave new world%'
   OR LOWER(title) LIKE '%alchemist%'
   OR LOWER(title) LIKE '%dune%'
   OR LOWER(title) LIKE '%foundation%'
   OR LOWER(title) LIKE '%romantic%'
   OR LOWER(title) LIKE '%romance%'
   OR LOWER(title) LIKE '%love%';

-- 6. Categorize Self-Help & Psychology
UPDATE book SET category = 'Self-Help & Psychology'
WHERE LOWER(title) LIKE '%atomic habits%'
   OR LOWER(title) LIKE '%thinking, fast and slow%'
   OR LOWER(title) LIKE '%deep work%'
   OR LOWER(title) LIKE '%psychology of money%'
   OR LOWER(title) LIKE '%search for meaning%'
   OR LOWER(title) LIKE '%hard times%'
   OR LOWER(title) LIKE '%life is not easy%'
   OR LOWER(title) LIKE '%trust the energy%'
   OR LOWER(title) LIKE '%keep soft%'
   OR LOWER(title) LIKE '%experiments with truth%'
   OR LOWER(title) LIKE '%hi god%';

-- 7. Categorize Business & Economics
UPDATE book SET category = 'Business & Economics'
WHERE LOWER(title) LIKE '%lean startup%'
   OR LOWER(title) LIKE '%zero to one%'
   OR LOWER(title) LIKE '%good to great%'
   OR LOWER(title) LIKE '%intelligent investor%';

-- 8. Categorize History & Philosophy
UPDATE book SET category = 'History & Philosophy'
WHERE LOWER(title) LIKE '%sapiens%'
   OR LOWER(title) LIKE '%art of war%'
   OR LOWER(title) LIKE '%meditations%';

-- Set remaining nulls to General
UPDATE book SET category = 'General & Reference' WHERE category IS NULL OR category = '' OR category = 'General';
