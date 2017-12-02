/*
CREATE OR REPLACE FUNCTION photo_like() RETURNS TRIGGER AS
  $BODY$
    BEGIN
      UPDATE main_photo SET like_count=main_photo.like_count+1 WHERE id=new.photo_id;
      RETURN new;
    END;
  $BODY$
  LANGUAGE plpgsql;
CREATE TRIGGER photoLike AFTER INSERT ON main_photo_likes FOR EACH ROW EXECUTE PROCEDURE photo_like();


CREATE OR REPLACE FUNCTION photo_dislike() RETURNS TRIGGER AS
$BODY$
BEGIN
  UPDATE main_photo SET like_count=main_photo.like_count-1 WHERE id=new.photo_id;
  RETURN new;
END;
$BODY$
LANGUAGE plpgsql;
CREATE TRIGGER photoDislike AFTER DELETE ON main_photo_likes FOR EACH ROW EXECUTE PROCEDURE photo_dislike();*/
