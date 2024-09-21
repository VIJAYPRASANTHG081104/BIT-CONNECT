export default function Friends({ friends }) {

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Friends
        <div className="profile_header_link">See all friends</div>
      </div>
      <div className="profile_card_count">
        {friends && (friends.length === 0
          ? ""
          : friends.length === 1
          ? "1 Photo"
          : `${friends.length} friends`)}
      </div>
      <div className="profile_card_grid">
        {friends &&
          friends
            .slice(0, 9)
            .map((friends) => <div className="profile_photo_card"></div>)}
      </div>
    </div>
  );
}
