import { AugmentedBirth, LikesByDateMap, LikesMap } from "../types";

type Props = {
  likesMap: LikesMap;
};

const LikesDisplay = ({ likesMap }: Props) => {
  const likesByDate: LikesByDateMap = Object.values(likesMap).reduce(
    (acc: LikesByDateMap, item: AugmentedBirth) => {
      acc[item.date] = acc[item.date] ? [...acc[item.date], item] : [item];
      return acc;
    },
    {}
  );

  if (Object.keys(likesByDate).length === 0) {
    return <span>No likes yet</span>;
  }

  return (
    <div>
      {Object.keys(likesByDate).map((date: string) => (
        <>
          <h3 key={date}>{date}</h3>
          <ul>
            {likesByDate[date].map((likedItem: AugmentedBirth) => (
              <li key={likedItem.text}>{likedItem.text}</li>
            ))}
          </ul>
        </>
      ))}
    </div>
  );
};

export default LikesDisplay;
