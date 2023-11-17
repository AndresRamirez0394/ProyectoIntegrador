import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Comment from "./NewComment";

function CommentFeed({ comments }) {
  const [loading, setLoading] = useState(true);

  // Simulamos una carga inicial que se completa después de 2 segundos
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        // Muestra un esqueleto o indicador de carga mientras se cargan los comentarios
        <Typography variant="h6">Loading Comments...</Typography>
      ) : comments?.length === 0 ? (
        // Muestra un mensaje si no hay comentarios
        <Typography variant="body1">No comments yet.</Typography>
      ) : (
        // Muestra la lista de comentarios
        comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} />
            <Divider />
          </React.Fragment>
        ))
      )}
    </Box>
  );
}

export default CommentFeed;